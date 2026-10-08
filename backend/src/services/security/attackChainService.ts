import { SecurityEventModel } from '../../models/SecurityEvent.js';
import { ThreatEventModel } from '../../models/ThreatEvent.js';
import { threatService } from '../ai/threatService.js';
import { socketManager } from '../../sockets/socketManager.js';
import { randomUUID } from 'crypto';

export class AttackChainService {
  /**
   * Correlates recent security events and evaluates attack chain progression
   */
  public async detectAttackChains(userId?: string) {
    const query: any = {};
    if (userId) query.userId = userId;

    // Fetch the 30 most recent security events
    const recentEvents = await SecurityEventModel.find(query).sort({ timestamp: 1 }).limit(30);

    if (recentEvents.length === 0) {
      return {
        isAttackChain: false,
        chains: [],
        message: 'Insufficient telemetry to establish correlated attack chains.'
      };
    }

    // Run AI Correlation engine with Gemma 4 26B
    const correlation = await threatService.analyzeAttackChain(
      recentEvents.map(e => ({
        id: e.id,
        type: e.type,
        severity: e.severity,
        source: e.source,
        metadata: e.metadata,
        timestamp: e.timestamp
      }))
    );

    if (correlation.isAttackChain) {
      const threatRecord = await ThreatEventModel.create({
        id: randomUUID(),
        threatScore: correlation.riskLevel === 'CRITICAL' ? 98 : 88,
        attackChain: correlation.stages,
        riskLevel: correlation.riskLevel,
        primaryHypothesis: correlation.primaryHypothesis,
        recommendedMitigation: correlation.recommendedMitigation,
        confidence: correlation.confidence,
        eventsCorrelated: recentEvents.map(e => e.id),
        userId,
        status: 'active'
      });

      // Emit real-time threat socket
      socketManager.emitThreat({
        id: threatRecord.id,
        score: threatRecord.threatScore,
        riskLevel: threatRecord.riskLevel,
        stages: correlation.stages,
        hypothesis: correlation.primaryHypothesis,
        mitigation: correlation.recommendedMitigation
      });

      return {
        isAttackChain: true,
        threatEventId: threatRecord.id,
        ...correlation
      };
    }

    return {
      isAttackChain: false,
      ...correlation
    };
  }

  public async getRecentChains(limit: number = 20) {
    return ThreatEventModel.find().sort({ createdAt: -1 }).limit(limit);
  }
}

export const attackChainService = new AttackChainService();
