import { IntentContractModel } from '../../models/IntentContract.js';
import { IntentEventModel } from '../../models/IntentEvent.js';
import { cartService } from '../commerce/cartService.js';
import { intentService } from '../ai/intentService.js';
import { randomUUID } from 'crypto';

export interface IntentDriftEvaluation {
  driftDetected: boolean;
  driftScore: number;
  originalBudget: number;
  currentTotal: number;
  exceededBy: number;
  percentageOverBudget: number;
  changedConstraints: string[];
  explanation: string;
  advisoryRecommendation: string;
  recentTimeline: any[];
}

export class IntentDriftEngine {
  /**
   * Evaluates drift between the initial Intent Contract and active cart/actions
   */
  public async evaluateDrift(userId?: string, sessionId?: string): Promise<IntentDriftEvaluation> {
    // 1. Fetch current active intent contract
    const contract = await IntentContractModel.findOne(
      userId ? { userId } : {}
    ).sort({ createdAt: -1 });

    const originalBudget = contract ? contract.budget.max : 80000;

    // 2. Fetch current cart total (DETERMINISTIC server calculation)
    let currentTotal = 0;
    if (userId) {
      const cart = await cartService.recalculateCart(userId);
      if (cart.total > 0) {
        currentTotal = cart.total;
      }
    }

    if (currentTotal === 0) {
      // Fallback: examine recent intent events
      const recentEvents = await IntentEventModel.find({
        ...(userId ? { userId } : sessionId ? { sessionId } : {})
      }).sort({ timestamp: -1 }).limit(10);
      
      const lastPriceEvent = recentEvents.find(e => e.payload?.runningTotal || e.payload?.price);
      currentTotal = lastPriceEvent?.payload?.runningTotal || lastPriceEvent?.payload?.price || 0;
    }

    // 3. Deterministic calculation of drift
    const exceededBy = Math.max(0, currentTotal - originalBudget);
    const percentageOver = originalBudget > 0 ? (exceededBy / originalBudget) * 100 : 0;

    // Drift score calculation: 0 to 100
    let driftScore = 0;
    let driftDetected = false;

    if (exceededBy > 0) {
      driftDetected = true;
      driftScore = Math.min(100, Math.round(30 + (percentageOver * 1.5)));
    } else if (currentTotal > originalBudget * 0.9) {
      // approaching budget limit
      driftScore = 25;
    }

    // 4. Retrieve event timeline
    const timeline = await IntentEventModel.find({
      ...(userId ? { userId } : sessionId ? { sessionId } : {})
    }).sort({ timestamp: 1 }).limit(25);

    // 5. AI contextual explanation of the deterministic metrics
    const aiExplanation = await intentService.explainDrift(
      contract ? (contract as any) : {
        goal: 'Workstation laptop with 32GB RAM under ₹80,000',
        budget: { max: originalBudget, currency: 'INR' },
        hardConstraints: ['RAM >= 32GB'],
        preferences: ['AI/ML performance'],
        exclusions: [],
        priorities: ['Budget adherence'],
        riskLevel: 'low'
      },
      {
        originalBudget,
        currentTotal,
        exceededBy,
        driftScore,
        actions: timeline.map(t => ({ type: t.type, payload: t.payload, timestamp: t.timestamp }))
      }
    );

    return {
      driftDetected,
      driftScore,
      originalBudget,
      currentTotal,
      exceededBy,
      percentageOverBudget: Math.round(percentageOver),
      changedConstraints: aiExplanation.changedConstraints,
      explanation: aiExplanation.explanation,
      advisoryRecommendation: aiExplanation.advisoryRecommendation,
      recentTimeline: timeline
    };
  }

  /**
   * Records a user exploration or cart event to the intent timeline
   */
  public async recordEvent(data: {
    userId?: string;
    sessionId?: string;
    type: 'CONTRACT_CREATED' | 'PRODUCT_VIEWED' | 'CART_ADDED' | 'QUANTITY_CHANGED' | 'ADDON_ADDED' | 'CHECKOUT_PRICE_DRIFT';
    payload: any;
  }) {
    return IntentEventModel.create({
      id: randomUUID(),
      userId: data.userId,
      sessionId: data.sessionId,
      type: data.type,
      payload: data.payload,
      timestamp: new Date()
    });
  }
}

export const intentDriftEngine = new IntentDriftEngine();
