import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';
import { IntentContractModel } from '../models/IntentContract.js';
import { IntentEventModel } from '../models/IntentEvent.js';
import { intentService } from '../services/ai/intentService.js';
import { intentDriftEngine } from '../services/intent/intentDriftEngine.js';
import { socketManager } from '../sockets/socketManager.js';
import { randomUUID } from 'crypto';

export class IntentController {
  private getUserId(req: AuthenticatedRequest): string | undefined {
    return req.user?.id || (req.headers['x-session-id'] as string) || undefined;
  }

  public async analyze(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { text } = req.body;
    const userId = this.getUserId(req);

    const contractDTO = await intentService.analyzeText(text);

    // Save active intent contract in database
    const contractId = `INTENT-${Date.now().toString(36).toUpperCase()}`;
    const contract = await IntentContractModel.create({
      id: contractId,
      userId,
      ...contractDTO
    });

    // Record CONTRACT_CREATED in timeline
    await intentDriftEngine.recordEvent({
      userId,
      type: 'CONTRACT_CREATED',
      payload: { goal: contract.goal, maxBudget: contract.budget.max, hardConstraints: contract.hardConstraints }
    });

    socketManager.emitIntent({
      event: 'INTENT_CREATED',
      contractId: contract.id,
      goal: contract.goal,
      budget: contract.budget,
      hardConstraints: contract.hardConstraints,
      preferences: contract.preferences
    });

    socketManager.emitEvent({
      type: 'INTENT_CREATED',
      userId,
      metadata: { contractId: contract.id, budget: contract.budget.max },
      explanation: `Customer stated objective: "${contract.goal}" (Budget: ₹${contract.budget.max.toLocaleString('en-IN')})`,
      timestamp: new Date().toISOString()
    });

    res.json({
      success: true,
      data: { intentContract: contract }
    });
  }

  public async match(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { intentContract, product } = req.body;
    const matchResult = intentService.matchProduct(intentContract, product);

    res.json({
      success: true,
      data: matchResult
    });
  }

  public async recordEvent(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = this.getUserId(req);
    const { type, payload } = req.body;

    const event = await intentDriftEngine.recordEvent({
      userId,
      type,
      payload
    });

    // If drift might have been triggered, evaluate drift
    if (type === 'CART_ADDED' || type === 'ADDON_ADDED' || type === 'CHECKOUT_PRICE_DRIFT') {
      const drift = await intentDriftEngine.evaluateDrift(userId);
      if (drift.driftDetected) {
        socketManager.emitIntent({
          event: 'INTENT_DRIFT',
          driftScore: drift.driftScore,
          exceededBy: drift.exceededBy,
          currentTotal: drift.currentTotal,
          originalBudget: drift.originalBudget,
          explanation: drift.explanation
        });

        socketManager.emitEvent({
          type: 'INTENT_DRIFT',
          userId,
          severity: drift.driftScore > 70 ? 'high' : 'medium',
          explanation: drift.explanation,
          metadata: { driftScore: drift.driftScore, exceededBy: drift.exceededBy },
          timestamp: new Date().toISOString()
        });
      }
    }

    res.status(201).json({
      success: true,
      data: { event }
    });
  }

  public async getCurrent(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = this.getUserId(req);
    const contract = await IntentContractModel.findOne(userId ? { userId } : {}).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { intentContract: contract }
    });
  }

  public async getDrift(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = this.getUserId(req);
    const driftEvaluation = await intentDriftEngine.evaluateDrift(userId);

    res.json({
      success: true,
      data: driftEvaluation
    });
  }

  public async getTimeline(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = this.getUserId(req);
    const events = await IntentEventModel.find(userId ? { userId } : {}).sort({ timestamp: 1 }).limit(50);

    res.json({
      success: true,
      data: { events }
    });
  }
}

export const intentController = new IntentController();
