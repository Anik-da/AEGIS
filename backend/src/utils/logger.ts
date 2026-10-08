export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  SECURITY = 'SECURITY'
}

const REDACTED_KEYS = new Set([
  'password',
  'passwordHash',
  'jwt',
  'token',
  'secret',
  'refreshToken',
  'accessToken',
  'apiKey',
  'authorization',
  'card',
  'cvv'
]);

function sanitize(obj: any): any {
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(sanitize);

  const cleaned: Record<string, any> = {};
  for (const [key, val] of Object.entries(obj)) {
    if (REDACTED_KEYS.has(key.toLowerCase()) || key.toLowerCase().includes('secret') || key.toLowerCase().includes('password')) {
      cleaned[key] = '[REDACTED]';
    } else if (typeof val === 'object') {
      cleaned[key] = sanitize(val);
    } else {
      cleaned[key] = val;
    }
  }
  return cleaned;
}

export const logger = {
  info: (message: string, meta?: Record<string, any>) => {
    console.log(`[${new Date().toISOString()}] [INFO] ${message}`, meta ? JSON.stringify(sanitize(meta)) : '');
  },
  warn: (message: string, meta?: Record<string, any>) => {
    console.warn(`[${new Date().toISOString()}] [WARN] ${message}`, meta ? JSON.stringify(sanitize(meta)) : '');
  },
  error: (message: string, error?: any, meta?: Record<string, any>) => {
    const errObj = error instanceof Error ? { message: error.message, stack: error.stack } : error;
    console.error(`[${new Date().toISOString()}] [ERROR] ${message}`, JSON.stringify(sanitize({ ...meta, error: errObj })));
  },
  security: (message: string, event: Record<string, any>) => {
    console.warn(`[${new Date().toISOString()}] [🛡️ SECURITY] ${message}`, JSON.stringify(sanitize(event)));
  },
  ai: (provider: string, model: string, durationMs: number, success: boolean, meta?: Record<string, any>) => {
    console.log(`[${new Date().toISOString()}] [🤖 AI] [${provider}:${model}] duration=${durationMs}ms success=${success}`, meta ? JSON.stringify(sanitize(meta)) : '');
  }
};
