import { ZodSchema } from 'zod';
import { ENV } from '../../config/env.js';
import { logger } from '../../utils/logger.js';

export interface OpenRouterResponse<T> {
  success: boolean;
  data?: T;
  rawText?: string;
  error?: string;
  model: string;
  durationMs: number;
}

export class OpenRouterService {
  private apiKey: string;
  private primaryModel: string;

  constructor() {
    this.apiKey = ENV.OPENROUTER_API_KEY;
    // Normalize google/gemma-4-26b-a4b to google/gemma-4-26b-a4b-it which is the exact valid OpenRouter slug
    this.primaryModel = ENV.OPENROUTER_MODEL.includes('gemma-4-26b-a4b') && !ENV.OPENROUTER_MODEL.endsWith('-it')
      ? `${ENV.OPENROUTER_MODEL}-it`
      : ENV.OPENROUTER_MODEL;
  }

  public isAvailable(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 10);
  }

  public async generateStructuredAnalysis<T>(
    prompt: string,
    schema?: ZodSchema<T>,
    systemPrompt: string = 'You are AEGIS Autonomous Security Intelligence. Always return valid, well-formed JSON matching the requested structure.'
  ): Promise<OpenRouterResponse<T>> {
    if (!this.isAvailable()) {
      return {
        success: false,
        error: 'OpenRouter API key is not configured',
        model: this.primaryModel,
        durationMs: 0
      };
    }

    const startTime = Date.now();
    const timeoutMs = 25000;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://aegis-commerce.local',
          'X-Title': 'AEGIS Commerce'
        },
        body: JSON.stringify({
          model: this.primaryModel,
          temperature: 0.1,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
          ]
        })
      });

      clearTimeout(timer);
      const durationMs = Date.now() - startTime;

      if (!response.ok) {
        const errorText = await response.text();
        logger.warn(`OpenRouter request failed (${response.status})`, { status: response.status, errorText: errorText.slice(0, 300) });
        return {
          success: false,
          error: `OpenRouter HTTP ${response.status}: ${errorText.slice(0, 200)}`,
          model: this.primaryModel,
          durationMs
        };
      }

      const json = await response.json();
      const rawContent = json.choices?.[0]?.message?.content || '';

      // Extract JSON from potential markdown wrapping
      const cleaned = this.extractJsonString(rawContent);
      let parsed: any;
      try {
        parsed = JSON.parse(cleaned);
      } catch (parseErr) {
        logger.warn('Failed to parse OpenRouter JSON output', { rawContent: rawContent.slice(0, 300) });
        return {
          success: false,
          rawText: rawContent,
          error: 'Model response was not valid JSON',
          model: this.primaryModel,
          durationMs
        };
      }

      // If schema is provided, validate with Zod
      if (schema) {
        const validation = schema.safeParse(parsed);
        if (!validation.success) {
          logger.warn('OpenRouter output failed Zod validation', { issues: validation.error.issues });
          return {
            success: false,
            data: parsed as T,
            error: `Zod validation error: ${validation.error.issues.map(i => i.message).join('; ')}`,
            model: this.primaryModel,
            durationMs
          };
        }
        logger.ai('OpenRouter', this.primaryModel, durationMs, true);
        return {
          success: true,
          data: validation.data,
          rawText: rawContent,
          model: this.primaryModel,
          durationMs
        };
      }

      logger.ai('OpenRouter', this.primaryModel, durationMs, true);
      return {
        success: true,
        data: parsed as T,
        rawText: rawContent,
        model: this.primaryModel,
        durationMs
      };
    } catch (err: any) {
      clearTimeout(timer);
      const durationMs = Date.now() - startTime;
      const errorMsg = err.name === 'AbortError' ? 'OpenRouter request timed out' : err.message;
      logger.error('OpenRouter call error', err, { durationMs, model: this.primaryModel });
      return {
        success: false,
        error: errorMsg,
        model: this.primaryModel,
        durationMs
      };
    }
  }

  private extractJsonString(text: string): string {
    const trimmed = text.trim();
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) return trimmed;
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) return trimmed;

    // Check for ```json ... ``` or ``` ... ```
    const match = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (match && match[1]) {
      return match[1].trim();
    }

    // Try finding the first { to the last }
    const firstBrace = trimmed.indexOf('{');
    const lastBrace = trimmed.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      return trimmed.substring(firstBrace, lastBrace + 1);
    }

    return trimmed;
  }
}

export const openRouterService = new OpenRouterService();
