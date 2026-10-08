import { RepairEventModel } from '../../models/RepairEvent.js';
import { SecurityEventModel } from '../../models/SecurityEvent.js';
import { healService } from './healService.js';
import { socketManager } from '../../sockets/socketManager.js';
import { logger } from '../../utils/logger.js';
import { randomUUID } from 'crypto';

export class RollbackService {
  private activeVersion: string = '2.4.1';
  private versionHistory: Array<{
    version: string;
    deployedAt: Date;
    status: 'active' | 'rolled_back' | 'deprecated';
    commitHash: string;
  }> = [
    { version: '2.4.0', deployedAt: new Date(Date.now() - 7 * 86400000), status: 'deprecated', commitHash: 'a7c1409' },
    { version: '2.4.1', deployedAt: new Date(Date.now() - 2 * 86400000), status: 'active', commitHash: 'e39b821' }
  ];

  public getVersions() {
    return {
      currentVersion: this.activeVersion,
      history: this.versionHistory
    };
  }

  public setVersion(v: string) {
    this.activeVersion = v;
  }

  /**
   * Triggers automated or operator rollback when telemetry detects post-deployment regression
   */
  public async executeRollback(reason?: string) {
    const failedVersion = this.activeVersion === '2.4.2' ? '2.4.2' : '2.4.2-canary';
    const restoredVersion = '2.4.1';
    const rollbackReason = reason || 'Synthetic telemetry detected errorRate > 5% threshold following canary rollout.';

    this.activeVersion = restoredVersion;

    const latestRepair = await RepairEventModel.findOne({ deployed: true });
    if (latestRepair) {
      latestRepair.rolledBack = true;
      latestRepair.rollbackReason = rollbackReason;
      await RepairEventModel.updateOne({ id: latestRepair.id }, latestRepair);
    }

    // Record SecurityEvent
    await SecurityEventModel.create({
      id: randomUUID(),
      type: 'ROLLBACK_TRIGGERED',
      severity: 'medium',
      source: 'HealGuard:RollbackEngine',
      metadata: {
        failedVersion,
        restoredVersion,
        reason: rollbackReason
      },
      explanation: `Automated zero-downtime rollback initiated: Restored stable build ${restoredVersion} following canary anomaly.`,
      timestamp: new Date()
    });

    // Emit real-time WebSocket event
    socketManager.emitRollback({
      previousVersion: restoredVersion,
      failedVersion,
      rollbackReason,
      restored: true,
      timestamp: new Date().toISOString()
    });

    socketManager.emitEvent({
      id: randomUUID(),
      type: 'ROLLBACK_TRIGGERED',
      severity: 'medium',
      source: 'HealGuard',
      explanation: rollbackReason,
      timestamp: new Date().toISOString()
    });

    logger.security(`Rollback executed from ${failedVersion} to ${restoredVersion}`, { reason: rollbackReason });

    return {
      previousVersion: restoredVersion,
      failedVersion,
      rollbackReason,
      restored: true
    };
  }
}

export const rollbackService = new RollbackService();
