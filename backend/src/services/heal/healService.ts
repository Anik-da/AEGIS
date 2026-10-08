import { RepairEventModel, IRepairEventDocument } from '../../models/RepairEvent.js';
import { SecurityEventModel } from '../../models/SecurityEvent.js';
import { codeAnalysisService } from '../ai/codeAnalysisService.js';
import { patchService } from '../ai/patchService.js';
import { verificationService } from '../ai/verificationService.js';
import { socketManager } from '../../sockets/socketManager.js';
import { logger } from '../../utils/logger.js';
import { randomUUID } from 'crypto';

export class HealService {
  private currentVersion: string = '2.4.1';

  public getCurrentVersion(): string {
    return this.currentVersion;
  }

  /**
   * Stage 1: Detect & Understand
   */
  public async analyzeVulnerability(payload: {
    filePath: string;
    code: string;
    error: string;
    context?: string;
  }) {
    logger.info(`[HealGuard] Analyzing fault in ${payload.filePath}`);
    const analysis = await codeAnalysisService.analyzeCode(payload);
    return analysis;
  }

  /**
   * Stage 2: Generate Candidate Patch
   */
  public async generatePatch(payload: {
    problem: string;
    code: string;
    analysis: any;
  }) {
    logger.info(`[HealGuard] Generating candidate patch for: ${payload.problem}`);
    const candidate = await patchService.generateCandidatePatch(payload);
    const patchId = `PATCH-${Date.now().toString(36).toUpperCase()}`;

    return {
      patchId,
      targetFile: 'src/validators/checkoutValidator.ts',
      ...candidate
    };
  }

  /**
   * Stage 3: Sandbox Verification
   */
  public async verifyAndStagePatch(payload: {
    patchId: string;
    filePath: string;
    rootCause: string;
    severity?: 'low' | 'medium' | 'high' | 'critical';
    candidatePatch: string;
  }) {
    logger.info(`[HealGuard] Verifying candidate patch ${payload.patchId} in sandbox`);
    const verification = await verificationService.verifyPatch(payload.patchId, payload.candidatePatch);

    const nextVersion = '2.4.2';
    const repairRecord = await RepairEventModel.create({
      id: randomUUID(),
      patchId: payload.patchId,
      version: nextVersion,
      previousVersion: this.currentVersion,
      filePath: payload.filePath,
      rootCause: payload.rootCause,
      severity: payload.severity || 'high',
      candidatePatch: payload.candidatePatch,
      testsRequired: ['Price verification test', 'AST type check'],
      testsPassed: verification.unitTestsPassed,
      securityChecksPassed: verification.securityChecksPassed,
      verified: verification.verified,
      deployed: verification.verified, // simulated staging deployment
      rolledBack: false,
      timestamp: new Date()
    });

    if (verification.verified) {
      this.currentVersion = nextVersion;

      // Emit real-time repair socket
      socketManager.emitRepair({
        id: repairRecord.id,
        version: nextVersion,
        patchId: payload.patchId,
        filePath: payload.filePath,
        status: 'DEPLOYED_CANARY',
        verified: true
      });

      await SecurityEventModel.create({
        id: randomUUID(),
        type: 'REPAIR_DEPLOYED',
        severity: 'low',
        source: 'HealGuard',
        metadata: {
          version: nextVersion,
          patchId: payload.patchId,
          testsPassed: true
        },
        explanation: `Candidate patch ${payload.patchId} verified and promoted to canary release ${nextVersion}.`,
        timestamp: new Date()
      });
    }

    return {
      repairRecord,
      verification
    };
  }

  public async getRepairEvents(limit: number = 20) {
    return RepairEventModel.find().sort({ timestamp: -1 }).limit(limit);
  }
}

export const healService = new HealService();
