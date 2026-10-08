import { z } from 'zod';
import { aiRouter } from './aiRouter.js';
import { buildTamperAnalysisPrompt } from './prompts/tamperPrompt.js';
import { EventSeverity } from '../../types/index.js';

const TamperAnalysisSchema = z.object({
  severity: z.enum(['cosmetic', 'low', 'medium', 'high', 'critical']),
  trustBoundaryBreach: z.boolean(),
  classification: z.string(),
  serverDecision: z.enum(['ALLOW', 'REJECT', 'REVOKE_SESSION']),
  explanation: z.string(),
  recommendedAction: z.string()
});

export type TamperAnalysisOutput = z.infer<typeof TamperAnalysisSchema>;

export class TamperService {
  public async analyzeTampering(details: {
    resource: string;
    expectedValue: any;
    observedValue: any;
    context?: any;
  }): Promise<TamperAnalysisOutput> {
    const prompt = buildTamperAnalysisPrompt(details);

    const fallback = (): TamperAnalysisOutput => {
      const isPrice = details.resource.toLowerCase().includes('price') || details.resource.toLowerCase().includes('cart');
      const isRole = details.resource.toLowerCase().includes('role');

      let severity: EventSeverity = 'medium';
      let classification = 'CLIENT_STATE_DISCREPANCY';

      if (isPrice) {
        severity = 'high';
        classification = 'DOM_PRICE_MANIPULATION';
      } else if (isRole) {
        severity = 'critical';
        classification = 'PRIVILEGE_FORGERY';
      }

      return {
        severity,
        trustBoundaryBreach: true,
        classification,
        serverDecision: 'REJECT',
        explanation: `Client submitted value (${JSON.stringify(details.observedValue)}) conflicted with authoritative server value (${JSON.stringify(details.expectedValue)}). Server suppressed untrusted client state and enforced ground truth.`,
        recommendedAction: 'Reject request with 403 Forbidden and record tamper security audit.'
      };
    };

    const res = await aiRouter.routeAnalysis(prompt, TamperAnalysisSchema, fallback, 'Tamper Analysis');
    return res.data;
  }
}

export const tamperService = new TamperService();
