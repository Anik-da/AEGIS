import { Request, Response } from 'express';
import { SecurityEventModel } from '../models/SecurityEvent.js';
import { ThreatEventModel } from '../models/ThreatEvent.js';
import { TamperEventModel } from '../models/TamperEvent.js';
import { IntentContractModel } from '../models/IntentContract.js';
import { RepairEventModel } from '../models/RepairEvent.js';
import { securityScoreService } from '../services/security/securityScoreService.js';
import { attackChainService } from '../services/security/attackChainService.js';
import { healService } from '../services/heal/healService.js';

export class AegisController {
  public async getOverview(req: Request, res: Response): Promise<void> {
    const [score, recentEvents, activeThreats, recentTamper] = await Promise.all([
      securityScoreService.computeSecurityScore(),
      SecurityEventModel.find().sort({ timestamp: -1 }).limit(10),
      ThreatEventModel.find({ status: 'active' }).limit(5),
      TamperEventModel.find().sort({ timestamp: -1 }).limit(5)
    ]);

    res.json({
      success: true,
      data: {
        securityScore: score,
        recentEvents,
        activeThreats,
        recentTamper,
        healStatus: {
          currentVersion: healService.getCurrentVersion(),
          readiness: 'NOMINAL'
        }
      }
    });
  }

  public async getSecurityScore(req: Request, res: Response): Promise<void> {
    const score = await securityScoreService.computeSecurityScore();
    res.json({ success: true, data: score });
  }

  public async getEvents(req: Request, res: Response): Promise<void> {
    const limit = parseInt((req.query.limit as string) || '50', 10);
    const events = await SecurityEventModel.find().sort({ timestamp: -1 }).limit(limit);
    res.json({ success: true, data: { events } });
  }

  public async getThreats(req: Request, res: Response): Promise<void> {
    const threats = await ThreatEventModel.find().sort({ createdAt: -1 }).limit(20);
    res.json({ success: true, data: { threats } });
  }

  public async getTampering(req: Request, res: Response): Promise<void> {
    const tampering = await TamperEventModel.find().sort({ timestamp: -1 }).limit(30);
    res.json({ success: true, data: { tampering } });
  }

  public async getIntent(req: Request, res: Response): Promise<void> {
    const contracts = await IntentContractModel.find().sort({ createdAt: -1 }).limit(10);
    res.json({ success: true, data: { contracts } });
  }

  public async getRepairs(req: Request, res: Response): Promise<void> {
    const repairs = await RepairEventModel.find().sort({ timestamp: -1 }).limit(20);
    res.json({ success: true, data: { repairs } });
  }

  public async getAttackChains(req: Request, res: Response): Promise<void> {
    const chains = await attackChainService.detectAttackChains();
    res.json({ success: true, data: chains });
  }
}

export const aegisController = new AegisController();
