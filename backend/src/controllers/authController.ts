import { Request, Response } from 'express';
import { UserModel } from '../models/User.js';
import { SessionModel } from '../models/Session.js';
import { SecurityEventModel } from '../models/SecurityEvent.js';
import { AuditLogModel } from '../models/AuditLog.js';
import { hashPassword, comparePassword, generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt.js';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';
import { socketManager } from '../sockets/socketManager.js';
import { logger } from '../utils/logger.js';
import { randomUUID } from 'crypto';

export class AuthController {
  public async register(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;

    const existing = await UserModel.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      res.status(409).json({
        success: false,
        error: { code: 'EMAIL_ALREADY_EXISTS', message: 'An account with this email already exists.' }
      });
      return;
    }

    const passwordHash = await hashPassword(password);
    const userId = `usr_${randomUUID().replace(/-/g, '').slice(0, 16)}`;

    // CRITICAL: Role is ALWAYS determined server-side as 'customer'. Never trust req.body.role!
    const user = await UserModel.create({
      id: userId,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
      role: 'customer'
    });

    const accessToken = generateAccessToken({ userId: user.id, email: user.email, role: user.role });
    const refreshToken = generateRefreshToken({ userId: user.id, email: user.email, role: user.role });

    const sessionId = randomUUID();
    await SessionModel.create({
      id: sessionId,
      userId: user.id,
      refreshTokenHash: await hashPassword(refreshToken),
      ip: req.ip || '127.0.0.1',
      userAgent: req.headers['user-agent'] || 'Unknown',
      expiresAt: new Date(Date.now() + 7 * 86400000)
    });

    await AuditLogModel.create({
      id: randomUUID(),
      actorId: user.id,
      action: 'USER_REGISTERED',
      targetResource: `user:${user.id}`,
      details: { email: user.email },
      ip: req.ip
    });

    res.status(201).json({
      success: true,
      data: {
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
        tokens: { accessToken, refreshToken }
      }
    });
  }

  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email.toLowerCase().trim() });

    // Handle unknown user
    if (!user) {
      await SecurityEventModel.create({
        id: randomUUID(),
        type: 'LOGIN_FAILED',
        severity: 'low',
        source: 'AuthSubsystem',
        metadata: { attemptedEmail: email, reason: 'ACCOUNT_NOT_FOUND' },
        explanation: 'Failed login attempt for non-existent email identity.',
        timestamp: new Date()
      });

      res.status(401).json({
        success: false,
        error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password.' }
      });
      return;
    }

    // Check account lockout
    if (user.lockoutUntil && user.lockoutUntil > new Date()) {
      const waitMinutes = Math.ceil((user.lockoutUntil.getTime() - Date.now()) / 60000);
      res.status(423).json({
        success: false,
        error: {
          code: 'ACCOUNT_LOCKED',
          message: `Account is locked due to repeated failed attempts. Try again in ${waitMinutes} minutes.`
        }
      });
      return;
    }

    const isMatch = await comparePassword(password, user.passwordHash);

    if (!isMatch) {
      const failedAttempts = (user.failedLoginAttempts || 0) + 1;
      let lockoutDate: Date | undefined;

      // Lockout threshold: 5 attempts -> 15 min lockout
      if (failedAttempts >= 5) {
        lockoutDate = new Date(Date.now() + 15 * 60000);
      }

      await UserModel.updateOne(
        { id: user.id },
        {
          $set: {
            failedLoginAttempts: failedAttempts,
            ...(lockoutDate ? { lockoutUntil: lockoutDate } : {})
          }
        }
      );

      const securitySeverity = failedAttempts >= 3 ? 'high' : 'medium';
      await SecurityEventModel.create({
        id: randomUUID(),
        type: 'LOGIN_FAILED',
        severity: securitySeverity,
        userId: user.id,
        source: 'AuthSubsystem',
        metadata: { failedAttempts, locked: Boolean(lockoutDate) },
        explanation: `Failed login attempt #${failedAttempts} for user ${user.email}.`,
        timestamp: new Date()
      });

      socketManager.emitEvent({
        id: randomUUID(),
        type: 'LOGIN_FAILED',
        severity: securitySeverity,
        source: 'AuthSubsystem',
        explanation: `Failed authentication attempt detected for account ${user.email}.`,
        timestamp: new Date().toISOString()
      });

      res.status(401).json({
        success: false,
        error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password.' }
      });
      return;
    }

    // Login Successful: Reset failed counters
    await UserModel.updateOne(
      { id: user.id },
      {
        $set: {
          failedLoginAttempts: 0,
          lockoutUntil: null,
          lastLoginAt: new Date()
        }
      }
    );

    const accessToken = generateAccessToken({ userId: user.id, email: user.email, role: user.role });
    const refreshToken = generateRefreshToken({ userId: user.id, email: user.email, role: user.role });

    const sessionId = randomUUID();
    await SessionModel.create({
      id: sessionId,
      userId: user.id,
      refreshTokenHash: await hashPassword(refreshToken),
      ip: req.ip || '127.0.0.1',
      userAgent: req.headers['user-agent'] || 'Unknown',
      expiresAt: new Date(Date.now() + 7 * 86400000)
    });

    await SecurityEventModel.create({
      id: randomUUID(),
      type: 'LOGIN_SUCCESS',
      severity: 'low',
      userId: user.id,
      sessionId,
      source: 'AuthSubsystem',
      metadata: { ip: req.ip },
      explanation: 'Authorized authentication session established.',
      timestamp: new Date()
    });

    res.json({
      success: true,
      data: {
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
        tokens: { accessToken, refreshToken, sessionId }
      }
    });
  }

  public async refresh(req: Request, res: Response): Promise<void> {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400).json({
        success: false,
        error: { code: 'REFRESH_TOKEN_REQUIRED', message: 'Refresh token must be provided.' }
      });
      return;
    }

    const payload = verifyRefreshToken(refreshToken);
    if (!payload) {
      res.status(401).json({
        success: false,
        error: { code: 'INVALID_REFRESH_TOKEN', message: 'Refresh token is expired or forged.' }
      });
      return;
    }

    const user = await UserModel.findOne({ id: payload.userId });
    if (!user) {
      res.status(401).json({
        success: false,
        error: { code: 'USER_NOT_FOUND', message: 'User account not found.' }
      });
      return;
    }

    const newAccessToken = generateAccessToken({ userId: user.id, email: user.email, role: user.role });

    res.json({
      success: true,
      data: { accessToken: newAccessToken }
    });
  }

  public async logout(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (req.user) {
      await SessionModel.updateMany({ userId: req.user.id }, { $set: { isValid: false } });
    }
    res.json({
      success: true,
      data: { message: 'Logged out successfully.' }
    });
  }

  public async me(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Not logged in.' } });
      return;
    }

    const user = await UserModel.findOne({ id: req.user.id });
    if (!user) {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'User not found.' } });
      return;
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          lastLoginAt: user.lastLoginAt
        }
      }
    });
  }
}

export const authController = new AuthController();
