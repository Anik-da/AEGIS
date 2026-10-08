import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, TokenPayload } from '../utils/jwt.js';
import { UserModel } from '../models/User.js';
import { UserRole } from '../types/index.js';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: UserRole;
  };
}

export async function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Authentication token missing or invalid format.' }
    });
    return;
  }

  const token = authHeader.split(' ')[1];
  const payload = verifyAccessToken(token);

  if (!payload) {
    res.status(401).json({
      success: false,
      error: { code: 'TOKEN_EXPIRED_OR_INVALID', message: 'Token has expired or is invalid.' }
    });
    return;
  }

  // CRITICAL SECURITY RULE: Verify user and role directly against the database
  const user = await UserModel.findOne({ id: payload.userId });
  if (!user) {
    res.status(401).json({
      success: false,
      error: { code: 'USER_NOT_FOUND', message: 'User account associated with token no longer exists.' }
    });
    return;
  }

  // Account lockout check
  if (user.lockoutUntil && user.lockoutUntil > new Date()) {
    res.status(403).json({
      success: false,
      error: { code: 'ACCOUNT_LOCKED', message: 'Account is temporarily locked due to repeated failed login attempts.' }
    });
    return;
  }

  req.user = {
    id: user.id,
    email: user.email,
    role: user.role // Database authoritative role, NOT client claimed role
  };

  next();
}

export function requireRole(allowedRoles: UserRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Authentication required.' }
      });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN', message: 'Insufficient role permissions for this resource.' }
      });
      return;
    }

    next();
  };
}

export async function optionalAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    const payload = verifyAccessToken(token);
    if (payload) {
      const user = await UserModel.findOne({ id: payload.userId });
      if (user) {
        req.user = {
          id: user.id,
          email: user.email,
          role: user.role
        };
      }
    }
  }
  next();
}
