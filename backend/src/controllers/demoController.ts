import { Request, Response } from 'express';
import { IntentContractModel } from '../models/IntentContract.js';
import { IntentEventModel } from '../models/IntentEvent.js';
import { SecurityEventModel } from '../models/SecurityEvent.js';
import { TamperEventModel } from '../models/TamperEvent.js';
import { ProductModel } from '../models/Product.js';
import { intentDriftEngine } from '../services/intent/intentDriftEngine.js';
import { tamperGuardService } from '../services/security/tamperGuardService.js';
import { attackChainService } from '../services/security/attackChainService.js';
import { healService } from '../services/heal/healService.js';
import { rollbackService } from '../services/heal/rollbackService.js';
import { socketManager } from '../sockets/socketManager.js';
import { randomUUID } from 'crypto';

export class DemoController {
  /**
   * DEMO SCENARIO 1 — INTENT DRIFT
   */
  public async demoIntentDrift(req: Request, res: Response): Promise<void> {
    const demoUserId = 'demo-user-intent-1';

    // 1. Create Initial Stated Intent Contract
    const contractId = `INTENT-DEMO-${Date.now().toString(36).toUpperCase()}`;
    await IntentContractModel.deleteMany({ userId: demoUserId });
    await IntentEventModel.deleteMany({ userId: demoUserId });

    const contract = await IntentContractModel.create({
      id: contractId,
      userId: demoUserId,
      goal: 'High-performance AI/ML laptop under ₹80,000 with at least 32GB RAM',
      budget: { max: 80000, currency: 'INR' },
      hardConstraints: ['RAM >= 32GB', 'Dedicated Tensor GPU'],
      preferences: ['Liquid metal cooling', 'OLED display'],
      exclusions: [],
      priorities: ['Machine learning performance', 'Strict budget constraint'],
      riskLevel: 'low'
    });

    // 2. Simulate User Journey Event Sequence
    const eventsToCreate = [
      { type: 'CONTRACT_CREATED', payload: { goal: contract.goal, maxBudget: 80000 } },
      { type: 'PRODUCT_VIEWED', payload: { productId: 'aegis-pro-x1', name: 'AEGIS PRO X1', price: 74999 } },
      { type: 'PRODUCT_VIEWED', payload: { productId: 'zenith-creator-16', name: 'ZENITH CREATOR 16', price: 79999 } },
      { type: 'CART_ADDED', payload: { productId: 'titan-workstation-ultra', name: 'TITAN WORKSTATION ULTRA', price: 84999, runningTotal: 84999 } },
      { type: 'ADDON_ADDED', payload: { addon: '3-Year AEGIS Accidental Shield Warranty', price: 7999, runningTotal: 92998 } }
    ];

    for (const item of eventsToCreate) {
      await intentDriftEngine.recordEvent({
        userId: demoUserId,
        type: item.type as any,
        payload: item.payload
      });
    }

    // 3. Compute Deterministic Drift Metrics & AI Contextual Explanation
    const driftEvaluation = await intentDriftEngine.evaluateDrift(demoUserId);

    socketManager.emitIntent({
      event: 'INTENT_DRIFT_DEMO',
      contractId: contract.id,
      originalBudget: 80000,
      currentTotal: 92998,
      exceededBy: 12998,
      driftScore: driftEvaluation.driftScore,
      explanation: driftEvaluation.explanation
    });

    res.json({
      success: true,
      demoScenario: 'SCENARIO 1 — INTENT DRIFT',
      data: {
        intentContract: contract,
        originalBudget: 80000,
        currentTotal: 92998,
        exceededBy: 12998,
        driftDetected: true,
        driftScore: driftEvaluation.driftScore,
        explanation: driftEvaluation.explanation,
        changedConstraints: driftEvaluation.changedConstraints,
        timeline: eventsToCreate
      }
    });
  }

  /**
   * DEMO SCENARIO 2 — TAMPERING
   */
  public async demoTamper(req: Request, res: Response): Promise<void> {
    const authoritativePrice = 74999;
    const observedClientPrice = 1; // Client tries ₹1 price manipulation

    const tamperResult = await tamperGuardService.processTamperEvent({
      type: 'DOM_PRICE_MANIPULATION',
      resource: 'product:aegis-pro-x1:price',
      expectedValue: authoritativePrice,
      observedValue: observedClientPrice,
      userId: 'demo-attacker-session',
      metadata: {
        attackVector: 'Client DevTools DOM Mutation / React State Override',
        submittedForm: { price: observedClientPrice, quantity: 1 }
      }
    });

    res.json({
      success: true,
      demoScenario: 'SCENARIO 2 — TAMPERING',
      data: {
        tampered: true,
        severity: 'high',
        authoritativePrice,
        observedClientPrice,
        transactionAllowed: false,
        classification: 'DOM_PRICE_MANIPULATION',
        serverDecision: 'REJECT',
        explanation: 'AEGIS detected client attempted to modify product price from ₹74,999 to ₹1. Transaction was suppressed and authoritative pricing enforced.',
        eventId: tamperResult.eventId
      }
    });
  }

  /**
   * DEMO SCENARIO 3 — ATTACK CHAIN
   */
  public async demoAttackChain(req: Request, res: Response): Promise<void> {
    const demoAttackerId = 'demo-actor-991';

    // Clear prior events for clean demonstration
    await SecurityEventModel.deleteMany({ userId: demoAttackerId });

    // 1. Generate 12 failed logins
    for (let i = 1; i <= 12; i++) {
      await SecurityEventModel.create({
        id: randomUUID(),
        type: 'LOGIN_FAILED',
        severity: i > 5 ? 'high' : 'medium',
        userId: demoAttackerId,
        source: 'AuthSubsystem',
        metadata: { attempt: i, path: '/api/auth/login' },
        explanation: `Repeated failed authentication sequence (#${i})`,
        timestamp: new Date(Date.now() - (15 - i) * 10000)
      });
    }

    // 2. Successful login
    await SecurityEventModel.create({
      id: randomUUID(),
      type: 'LOGIN_SUCCESS',
      severity: 'medium',
      userId: demoAttackerId,
      source: 'AuthSubsystem',
      metadata: { path: '/api/auth/login' },
      explanation: 'Compromised credential login after brute force attempts',
      timestamp: new Date(Date.now() - 20000)
    });

    // 3. Unusual endpoint accessed
    await SecurityEventModel.create({
      id: randomUUID(),
      type: 'SUSPICIOUS_ENDPOINT_ACCESS',
      severity: 'high',
      userId: demoAttackerId,
      source: 'API_Gateway',
      metadata: { path: '/api/admin/financial-ledgers' },
      explanation: 'Direct request to administrative internal financial ledger from non-admin token',
      timestamp: new Date(Date.now() - 10000)
    });

    // 4. Correlate with Gemma 4 26B
    const chainResult = await attackChainService.detectAttackChains(demoAttackerId);

    res.json({
      success: true,
      demoScenario: 'SCENARIO 3 — ATTACK CHAIN CORRELATION',
      data: chainResult
    });
  }

  /**
   * DEMO SCENARIO 4 — SELF HEALING (HEALGUARD)
   */
  public async demoHeal(req: Request, res: Response): Promise<void> {
    const demoProblem = 'Checkout validator accepts client-supplied price parameters, bypassing database verification';
    const demoCode = `// Vulnerable checkout validator
export async function validateCheckoutItem(item: any) {
  // FLOP: Trusting client price parameter
  const total = item.clientPrice * item.quantity;
  return { approved: true, total };
}`;

    // 1. Analyze with Gemma
    const analysis = await healService.analyzeVulnerability({
      filePath: 'src/validators/demoCheckoutValidator.ts',
      code: demoCode,
      error: 'CRITICAL SECURITY DEFECT: CWE-20 Incomplete Input Validation. Client price trusted blindly.',
      context: 'Checkout and Transaction Subsystem'
    });

    // 2. Generate Candidate Patch
    const patchResult = await healService.generatePatch({
      problem: demoProblem,
      code: demoCode,
      analysis
    });

    // 3. Sandboxed Verification & Simulated Canary Deployment
    const stageResult = await healService.verifyAndStagePatch({
      patchId: patchResult.patchId,
      filePath: 'src/validators/demoCheckoutValidator.ts',
      rootCause: analysis.rootCause,
      severity: analysis.severity,
      candidatePatch: patchResult.patch
    });

    res.json({
      success: true,
      demoScenario: 'SCENARIO 4 — AI-ASSISTED SELF HEALING',
      data: {
        analysis,
        patch: patchResult,
        verification: stageResult.verification,
        stagedVersion: '2.4.2',
        repairEvent: stageResult.repairRecord
      }
    });
  }

  /**
   * DEMO SCENARIO 5 — ROLLBACK
   */
  public async demoRollback(req: Request, res: Response): Promise<void> {
    const rollbackResult = await rollbackService.executeRollback(
      'Synthetic metric alert: Canary version 2.4.2 latency spikes exceeded SLA (>1200ms) on mock microbenchmark.'
    );

    res.json({
      success: true,
      demoScenario: 'SCENARIO 5 — AUTOMATED RECOVERY ROLLBACK',
      data: rollbackResult
    });
  }
}

export const demoController = new DemoController();
