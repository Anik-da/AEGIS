import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';
import { AuthenticatedRequest } from './authMiddleware.js';
import { randomUUID } from 'crypto';

export function requestAuditLogger(req: Request, res: Response, next: NextFunction): void {
  const reqId = randomUUID().slice(0, 8);
  const startTime = Date.now();
  (req as any).requestId = reqId;

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const authReq = req as AuthenticatedRequest;
    const userId = authReq.user?.id || 'anonymous';

    logger.info(`[HTTP] ${req.method} ${req.originalUrl || req.url} -> ${res.statusCode} (${duration}ms)`, {
      requestId: reqId,
      userId,
      status: res.statusCode,
      ip: req.ip || req.socket.remoteAddress
    });
  });

  next();
}
