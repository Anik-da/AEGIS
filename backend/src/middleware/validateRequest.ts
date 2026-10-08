import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export function validateBody<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_FAILED',
          message: 'Input validation failed',
          details: result.error.issues.map(i => ({ path: i.path.join('.'), message: i.message }))
        }
      });
      return;
    }
    req.body = result.data;
    next();
  };
}

export function validateQuery<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      res.status(400).json({
        success: false,
        error: {
          code: 'QUERY_VALIDATION_FAILED',
          message: 'Query parameter validation failed',
          details: result.error.issues.map(i => ({ path: i.path.join('.'), message: i.message }))
        }
      });
      return;
    }
    req.query = result.data as any;
    next();
  };
}
