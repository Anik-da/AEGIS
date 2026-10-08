import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { ENV } from './config/env.js';
import { isFirebaseConnected } from './config/firebase.js';
import { openRouterService } from './services/ai/openRouterService.js';
import { huggingFaceService } from './services/ai/huggingFaceService.js';
import { requestAuditLogger } from './middleware/auditLogger.js';
import { generalLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';
import apiRouter from './routes/index.js';

export function createApp(): Application {
  const app = express();

  // 1. Security Headers via Helmet
  app.use(helmet({
    contentSecurityPolicy: false, // Managed for modern dynamic SPA
    crossOriginEmbedderPolicy: false
  }));

  // 2. Cross-Origin Resource Sharing (CORS)
  app.use(cors({
    origin: [ENV.FRONTEND_URL, 'http://localhost:5173', 'http://127.0.0.1:5173', '*'],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-session-id', 'HTTP-Referer', 'X-Title'],
    credentials: true
  }));

  // 3. Body parsers with payload size limits
  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true, limit: '2mb' }));

  // 4. Request Logging & Audit
  app.use(requestAuditLogger);

  // 5. General Rate Limiter
  app.use('/api', generalLimiter);

  // 6. Health Check Endpoint (Requirement 49)
  app.get('/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      database: isFirebaseConnected() ? 'firestore' : 'disconnected',
      realtimeDatabase: 'https://aegis-commerce-default-rtdb.firebaseio.com',
      ai: {
        openrouter: openRouterService.isAvailable() ? 'available' : 'unconfigured',
        huggingface: huggingFaceService.isAvailable() ? 'available' : 'unconfigured'
      },
      environment: ENV.NODE_ENV,
      timestamp: new Date().toISOString()
    });
  });

  // 7. Master API Routes
  app.use('/api', apiRouter);

  // 8. 404 Route handler
  app.use('*', (req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      error: {
        code: 'ROUTE_NOT_FOUND',
        message: `Endpoint ${req.method} ${req.baseUrl || req.originalUrl} does not exist.`
      }
    });
  });

  // 9. Centralized Error Handler
  app.use(errorHandler);

  return app;
}
