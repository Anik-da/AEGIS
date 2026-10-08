import { ZodSchema } from 'zod';
import { openRouterService } from './openRouterService.js';
import { huggingFaceService } from './huggingFaceService.js';
import { logger } from '../../utils/logger.js';

export interface AIRoutingResult<T> {
  success: boolean;
  data: T;
  provider: 'openrouter' | 'huggingface' | 'deterministic-fallback';
  model: string;
  isFallback: boolean;
  explanationNote?: string;
  durationMs: number;
}

export class AIRouter {
  /**
   * Routes an AI request through:
   * 1. OpenRouter (Google Gemma 4 26B A4B)
   * 2. Hugging Face (Google Gemma model only)
   * 3. Deterministic fallback logic (Authoritative backend rules)
   */
  public async routeAnalysis<T>(
    prompt: string,
    schema: ZodSchema<T>,
    deterministicFallback: () => T,
    taskName: string = 'Analysis'
  ): Promise<AIRoutingResult<T>> {
    const overallStart = Date.now();

    // 1. Try OpenRouter (Gemma 4 26B A4B)
    if (openRouterService.isAvailable()) {
      try {
        const res = await openRouterService.generateStructuredAnalysis<T>(prompt, schema);
        if (res.success && res.data) {
          return {
            success: true,
            data: res.data,
            provider: 'openrouter',
            model: res.model,
            isFallback: false,
            durationMs: res.durationMs
          };
        }
        logger.warn(`[AI Router] OpenRouter failed for ${taskName}: ${res.error}. Attempting Hugging Face...`);
      } catch (err: any) {
        logger.warn(`[AI Router] OpenRouter error for ${taskName}: ${err.message}. Attempting Hugging Face...`);
      }
    }

    // 2. Try Hugging Face (Google Gemma model only)
    if (huggingFaceService.isAvailable()) {
      try {
        const hfRes = await huggingFaceService.generateInference<T>(prompt, schema);
        if (hfRes.success && hfRes.data) {
          return {
            success: true,
            data: hfRes.data,
            provider: 'huggingface',
            model: hfRes.model,
            isFallback: false,
            durationMs: hfRes.durationMs
          };
        }
        logger.warn(`[AI Router] Hugging Face failed for ${taskName}: ${hfRes.error}. Engaging deterministic fallback...`);
      } catch (err: any) {
        logger.warn(`[AI Router] Hugging Face error for ${taskName}: ${err.message}. Engaging deterministic fallback...`);
      }
    }

    // 3. Fallback to Deterministic Safety Engine
    logger.info(`[AI Router] Using deterministic rule-based safety engine for ${taskName}.`);
    const fallbackData = deterministicFallback();
    return {
      success: true,
      data: fallbackData,
      provider: 'deterministic-fallback',
      model: 'aegis-deterministic-rules-v1',
      isFallback: true,
      explanationNote: 'AI providers unreachable. Deterministic safety engine computed authoritative decision.',
      durationMs: Date.now() - overallStart
    };
  }
}

export const aiRouter = new AIRouter();
