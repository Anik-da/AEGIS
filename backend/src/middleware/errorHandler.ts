import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';
import { ENV } from '../config/env.js';

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
}

export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const statusCode = err.statusCode || 500;
  const errorCode = err.code || 'INTERNAL_SERVER_ERROR';

  logger.error(`[Express Error] ${req.method} ${req.url} -> ${statusCode}`, err, {
    code: errorCode,
    path: req.path
  });

  res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message: err.message || 'An unexpected internal error occurred.'
    }
  });
}
