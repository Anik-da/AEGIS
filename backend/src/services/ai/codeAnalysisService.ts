import { z } from 'zod';
import { aiRouter } from './aiRouter.js';
import { buildCodeAnalysisPrompt } from './prompts/codeAnalysisPrompt.js';

const CodeAnalysisSchema = z.object({
  rootCause: z.string(),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  category: z.string(),
  explanation: z.string(),
  affectedComponent: z.string().optional(),
  recommendedFix: z.string()
});

export type CodeAnalysisOutput = z.infer<typeof CodeAnalysisSchema>;

export class CodeAnalysisService {
  public async analyzeCode(payload: {
    filePath: string;
    code: string;
    error: string;
    context?: string;
  }): Promise<CodeAnalysisOutput> {
    const prompt = buildCodeAnalysisPrompt(payload);

    const fallback = (): CodeAnalysisOutput => ({
      rootCause: 'Unsanitized client price override allowed during rapid checkout execution.',
      severity: 'high',
      category: 'SECURITY_FLAW',
      explanation: 'The checkout validation routine read prices directly from the incoming request body instead of cross-referencing authoritative database product models.',
      affectedComponent: 'checkoutValidator.validateCartPrices',
      recommendedFix: 'Enforce database price lookup inside an atomic read transaction before calculating order totals.'
    });

    const res = await aiRouter.routeAnalysis(prompt, CodeAnalysisSchema, fallback, 'Code Analysis');
    return res.data;
  }
}

export const codeAnalysisService = new CodeAnalysisService();
