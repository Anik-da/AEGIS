import { z } from 'zod';
import { aiRouter } from './aiRouter.js';
import { buildIntentExtractionPrompt, buildIntentDriftExplanationPrompt } from './prompts/intentPrompt.js';
import { IntentContractSchema, IntentContractDTO } from '../../validators/intentValidators.js';
import { logger } from '../../utils/logger.js';

export interface IntentMatchResult {
  matchScore: number;
  hardConstraintViolations: string[];
  preferenceMatches: string[];
  reasons: string[];
  recommendation: 'strong_match' | 'acceptable' | 'weak_match' | 'mismatch';
}

export class IntentService {
  /**
   * Natural Language Intent Extraction using Gemma 4 26B (or fallback)
   */
  public async analyzeText(text: string): Promise<IntentContractDTO> {
    const prompt = buildIntentExtractionPrompt(text);

    const fallbackGenerator = (): IntentContractDTO => {
      // Deterministic NLP regex extractor fallback
      const budgetMatch = text.match(/(?:under|below|budget|within|max)\s*(?:₹|rs\.?|inr)?\s*([0-9,]+)/i);
      const ramMatch = text.match(/([0-9]+)\s*gb\s*ram/i);
      
      const parsedBudget = budgetMatch ? parseInt(budgetMatch[1].replace(/,/g, ''), 10) : 80000;
      const hardConstraints: string[] = [];
      if (ramMatch) hardConstraints.push(`RAM >= ${ramMatch[1]}GB`);
      
      const preferences: string[] = [];
      if (/ai|ml|machine learning|tensor/i.test(text)) preferences.push('AI/ML performance');
      if (/gaming|rtx|gpu/i.test(text)) preferences.push('High-end GPU computing');

      return {
        goal: text.slice(0, 100),
        budget: {
          max: parsedBudget || 80000,
          currency: 'INR'
        },
        hardConstraints: hardConstraints.length > 0 ? hardConstraints : ['RAM >= 32GB'],
        preferences: preferences.length > 0 ? preferences : ['AI/ML Workstations'],
        exclusions: [],
        priorities: ['Budget adherence', 'Hardware capability'],
        riskLevel: 'low'
      };
    };

    const result = await aiRouter.routeAnalysis<IntentContractDTO>(
      prompt,
      IntentContractSchema,
      fallbackGenerator,
      'Intent Extraction'
    );

    return result.data;
  }

  /**
   * Deterministic + Heuristic Product Matching against Intent Contract
   */
  public matchProduct(intentContract: IntentContractDTO, product: any): IntentMatchResult {
    let score = 100;
    const violations: string[] = [];
    const preferenceMatches: string[] = [];
    const reasons: string[] = [];

    const targetMax = intentContract.budget.max;
    const actualPrice = product.price;

    // 1. Budget hard check (Deterministic)
    if (targetMax > 0 && actualPrice > targetMax) {
      const overBy = actualPrice - targetMax;
      violations.push(`Budget exceeds maximum by ₹${overBy.toLocaleString('en-IN')}`);
      const penalty = Math.min(50, Math.round((overBy / targetMax) * 100));
      score -= penalty;
      reasons.push(`Priced at ₹${actualPrice.toLocaleString('en-IN')}, exceeding cap ₹${targetMax.toLocaleString('en-IN')}.`);
    } else {
      reasons.push(`Price ₹${actualPrice.toLocaleString('en-IN')} fits within target budget of ₹${targetMax.toLocaleString('en-IN')}.`);
    }

    // 2. RAM check
    const ramReq = intentContract.hardConstraints.find(c => /ram/i.test(c));
    if (ramReq) {
      const reqValMatch = ramReq.match(/([0-9]+)/);
      const reqGB = reqValMatch ? parseInt(reqValMatch[1], 10) : 32;

      // Check product specs or keySpecs
      let prodGB = 0;
      const specsStr = JSON.stringify(product.specifications || {}) + ' ' + (product.keySpecs || []).join(' ') + ' ' + product.name + ' ' + product.description;
      const prodRamMatch = specsStr.match(/([0-9]+)\s*gb\s*(?:ddr[0-9]|lpddr[0-9]|ram)?/i);
      if (prodRamMatch) {
        prodGB = parseInt(prodRamMatch[1], 10);
      }

      if (prodGB > 0 && prodGB < reqGB) {
        violations.push(`RAM is below required ${reqGB}GB (Observed: ${prodGB}GB)`);
        score -= 30;
      } else if (prodGB >= reqGB) {
        preferenceMatches.push(`Meets or exceeds RAM threshold with ${prodGB}GB RAM`);
      }
    }

    // 3. AI / ML preference check
    const aiPref = intentContract.preferences.some(p => /ai|ml|machine learning/i.test(p));
    const prodHasAI = /rtx|gpu|tensor|neural|ai|workstation/i.test(JSON.stringify(product));
    if (aiPref && prodHasAI) {
      preferenceMatches.push('Dedicated neural tensor / GPU acceleration aligned with AI/ML intent');
    } else if (aiPref && !prodHasAI) {
      score -= 15;
      reasons.push('Lacks dedicated hardware tensor accelerators for AI/ML workloads.');
    }

    const finalScore = Math.max(0, Math.min(100, score));

    let recommendation: 'strong_match' | 'acceptable' | 'weak_match' | 'mismatch';
    if (finalScore >= 85) recommendation = 'strong_match';
    else if (finalScore >= 65) recommendation = 'acceptable';
    else if (finalScore >= 40) recommendation = 'weak_match';
    else recommendation = 'mismatch';

    return {
      matchScore: finalScore,
      hardConstraintViolations: violations,
      preferenceMatches,
      reasons,
      recommendation
    };
  }

  /**
   * Explain Intent Drift via AI synthesis over deterministic math
   */
  public async explainDrift(
    contract: IntentContractDTO,
    metrics: { originalBudget: number; currentTotal: number; exceededBy: number; driftScore: number; actions: any[] }
  ): Promise<{ explanation: string; changedConstraints: string[]; advisoryRecommendation: string }> {
    const prompt = buildIntentDriftExplanationPrompt(contract, metrics);

    const schema = z.object({
      explanation: z.string(),
      changedConstraints: z.array(z.string()),
      advisoryRecommendation: z.string()
    });

    const fallback = () => ({
      explanation: `Your session started with a target budget of ₹${metrics.originalBudget.toLocaleString('en-IN')}. Subsequent selections, warranty additions, and higher-spec models have elevated the transaction to ₹${metrics.currentTotal.toLocaleString('en-IN')} (₹${metrics.exceededBy.toLocaleString('en-IN')} over budget).`,
      changedConstraints: ['Budget ceiling exceeded', 'Upgraded warranty and accessory package added'],
      advisoryRecommendation: 'Review added components in cart to ensure they match primary project priorities.'
    });

    const result = await aiRouter.routeAnalysis(prompt, schema, fallback, 'Drift Explanation');
    return result.data;
  }
}

export const intentService = new IntentService();
