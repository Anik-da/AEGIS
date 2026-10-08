import { ZodSchema } from 'zod';
import { ENV } from '../../config/env.js';
import { logger } from '../../utils/logger.js';

export interface HuggingFaceResponse<T> {
  success: boolean;
  data?: T;
  rawText?: string;
  error?: string;
  model: string;
  durationMs: number;
}

export class HuggingFaceService {
  private apiKey: string;
  private model: string;
  private endpoint: string;

  constructor() {
    this.apiKey = ENV.HUGGINGFACE_API_KEY;
    this.model = ENV.HUGGINGFACE_MODEL || 'Qwen/Qwen3-8B';
    this.endpoint = `https://api-inference.huggingface.co/models/${this.model}`;
  }

  public isAvailable(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 5);
  }

  public async generateInference<T>(
    prompt: string,
    schema?: ZodSchema<T>
  ): Promise<HuggingFaceResponse<T>> {
    if (!this.isAvailable()) {
      return {
        success: false,
        error: 'Hugging Face API key not configured',
        model: this.model,
        durationMs: 0
      };
    }

    const startTime = Date.now();
    const timeoutMs = 15000;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 512,
            temperature: 0.1,
            return_full_text: false
          }
        })
      });

      clearTimeout(timer);
      const durationMs = Date.now() - startTime;

      if (!response.ok) {
        const errorText = await response.text();
        return {
          success: false,
          error: `Hugging Face HTTP ${response.status}: ${errorText.slice(0, 200)}`,
          model: this.model,
          durationMs
        };
      }

      const result = await response.json();
      let rawText = '';
      if (Array.isArray(result) && result[0]?.generated_text) {
        rawText = result[0].generated_text;
      } else if (result?.generated_text) {
        rawText = result.generated_text;
      } else if (typeof result === 'string') {
        rawText = result;
      } else {
        rawText = JSON.stringify(result);
      }

      // Attempt parsing JSON if schema expected
      if (schema) {
        try {
          const cleaned = this.extractJson(rawText);
          const parsed = JSON.parse(cleaned);
          const val = schema.safeParse(parsed);
          if (val.success) {
            logger.ai('HuggingFace', this.model, durationMs, true);
            return {
              success: true,
              data: val.data,
              rawText,
              model: this.model,
              durationMs
            };
          }
        } catch {
          // fallback to passing raw text if parsing fails
        }
      }

      logger.ai('HuggingFace', this.model, durationMs, true);
      return {
        success: true,
        data: rawText as unknown as T,
        rawText,
        model: this.model,
        durationMs
      };
    } catch (err: any) {
      clearTimeout(timer);
      const durationMs = Date.now() - startTime;
      logger.warn('Hugging Face inference unavailable, falling back', { err: err.message });
      return {
        success: false,
        error: err.message,
        model: this.model,
        durationMs
      };
    }
  }

  private extractJson(text: string): string {
    const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (match && match[1]) return match[1].trim();
    const first = text.indexOf('{');
    const last = text.lastIndexOf('}');
    if (first !== -1 && last !== -1 && last > first) {
      return text.substring(first, last + 1);
    }
    return text.trim();
  }
}

export const huggingFaceService = new HuggingFaceService();
