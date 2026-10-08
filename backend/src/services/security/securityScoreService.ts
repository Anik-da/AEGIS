import { SecurityEventModel } from '../../models/SecurityEvent.js';
import { TamperEventModel } from '../../models/TamperEvent.js';
import { ThreatEventModel } from '../../models/ThreatEvent.js';
import { RepairEventModel } from '../../models/RepairEvent.js';

export interface SecurityScoreBreakdown {
  overallScore: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  metrics: {
    authenticationIntegrity: number; // 0-100
    tamperResistance: number; // 0-100
    threatMitigation: number; // 0-100
    selfHealingReadiness: number; // 0-100
  };
  telemetryCounts: {
    totalEvents: number;
    activeThreats: number;
    tamperIncidents: number;
    repairsDeployed: number;
  };
  statusSummary: string;
}

export class SecurityScoreService {
  /**
   * Computes authoritative dynamic AEGIS Protection Score based on actual event history
   */
  public async computeSecurityScore(): Promise<SecurityScoreBreakdown> {
    const oneDayAgo = new Date(Date.now() - 24 * 3600000);

    const [
      totalEvents,
      failedLogins,
      tamperCount,
      activeThreats,
      repairs
    ] = await Promise.all([
      SecurityEventModel.countDocuments({ timestamp: { $gte: oneDayAgo } }),
      SecurityEventModel.countDocuments({ type: 'LOGIN_FAILED', timestamp: { $gte: oneDayAgo } }),
      TamperEventModel.countDocuments({ timestamp: { $gte: oneDayAgo } }),
      ThreatEventModel.countDocuments({ status: 'active' }),
      RepairEventModel.countDocuments({ verified: true })
    ]);

    // Baseline starts at 100
    let authScore = Math.max(20, 100 - (failedLogins * 4));
    let tamperScore = Math.max(30, 100 - (tamperCount * 8));
    let threatScore = Math.max(10, 100 - (activeThreats * 15));
    let healScore = Math.min(100, 75 + (repairs * 10));

    // Weighted average:
    // Auth: 25%, Tamper: 30%, Threat: 30%, Healing: 15%
    const weighted = Math.round(
      authScore * 0.25 +
      tamperScore * 0.30 +
      threatScore * 0.30 +
      healScore * 0.15
    );

    const overallScore = Math.max(15, Math.min(100, weighted));

    let grade: SecurityScoreBreakdown['grade'] = 'A+';
    if (overallScore >= 92) grade = 'A+';
    else if (overallScore >= 85) grade = 'A';
    else if (overallScore >= 75) grade = 'B';
    else if (overallScore >= 60) grade = 'C';
    else if (overallScore >= 45) grade = 'D';
    else grade = 'F';

    let statusSummary = 'AEGIS Autonomous Defense Layer Active. All systems nominal.';
    if (activeThreats > 0) {
      statusSummary = `Caution: ${activeThreats} active correlated threat chains under containment.`;
    } else if (tamperCount > 0) {
      statusSummary = `Authoritative guard enforced: ${tamperCount} client-side tampering attempts suppressed.`;
    }

    return {
      overallScore,
      grade,
      metrics: {
        authenticationIntegrity: authScore,
        tamperResistance: tamperScore,
        threatMitigation: threatScore,
        selfHealingReadiness: healScore
      },
      telemetryCounts: {
        totalEvents,
        activeThreats,
        tamperIncidents: tamperCount,
        repairsDeployed: repairs
      },
      statusSummary
    };
  }
}

export const securityScoreService = new SecurityScoreService();
