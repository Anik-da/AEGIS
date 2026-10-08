import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';
import { SecurityEventModel } from '../models/SecurityEvent.js';
import { ThreatEventModel } from '../models/ThreatEvent.js';
import { TamperEventModel } from '../models/TamperEvent.js';
import { threatService } from '../services/ai/threatService.js';
import { tamperGuardService } from '../services/security/tamperGuardService.js';
import { attackChainService } from '../services/security/attackChainService.js';
import { transactionGuardService } from '../services/security/transactionGuardService.js';
import { socketManager } from '../sockets/socketManager.js';
import { randomUUID } from 'crypto';

export class SecurityController {
  public async analyzeEvent(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { event, recentHistory } = req.body;
    const analysis = await threatService.analyzeEvent(event, recentHistory || []);

    const eventRecord = await SecurityEventModel.create({
      id: randomUUID(),
      type: event.type || 'ANOMALY_DETECTED',
      severity: analysis.riskLevel.toLowerCase(),
      userId: req.user?.id,
      source: 'ThreatGuard',
      metadata: event.metadata || {},
      explanation: analysis.explanation,
      timestamp: new Date()
    });

    socketManager.emitEvent({
      id: eventRecord.id,
      type: eventRecord.type,
      severity: eventRecord.severity,
      explanation: analysis.explanation,
      timestamp: new Date().toISOString()
    });

    res.json({
      success: true,
      data: { analysis, eventId: eventRecord.id }
    });
  }

  public async getEvents(req: Request, res: Response): Promise<void> {
    const { limit = '50', severity, type } = req.query;
    const query: any = {};
    if (severity) query.severity = severity;
    if (type) query.type = type;

    const events = await SecurityEventModel.find(query)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit as string, 10));

    res.json({ success: true, data: { events } });
  }

  public async getThreats(req: Request, res: Response): Promise<void> {
    const threats = await ThreatEventModel.find().sort({ createdAt: -1 }).limit(20);
    res.json({ success: true, data: { threats } });
  }

  public async getAttackChains(req: Request, res: Response): Promise<void> {
    const chains = await attackChainService.detectAttackChains();
    res.json({ success: true, data: chains });
  }

  public async reportTamper(req: AuthenticatedRequest, res: Response): Promise<void> {
    const result = await tamperGuardService.processTamperEvent({
      ...req.body,
      userId: req.user?.id || req.body.userId,
      sessionId: (req.headers['x-session-id'] as string) || req.body.sessionId
    });

    res.json({ success: true, data: result });
  }

  public async getTamperEvents(req: Request, res: Response): Promise<void> {
    const tamperEvents = await tamperGuardService.getTamperEvents();
    res.json({ success: true, data: { tamperEvents } });
  }

  public async checkTransaction(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = req.user?.id || req.body.userId || 'guest-session-1';
    const { claimedTotal } = req.body;

    const result = await transactionGuardService.evaluateTransaction(userId, claimedTotal);
    res.json({ success: true, data: result });
  }
}

export const securityController = new SecurityController();
