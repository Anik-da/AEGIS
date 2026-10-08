import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Firebase Configuration
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || 'aegis-commerce',
  FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL || 'https://aegis-commerce-default-rtdb.firebaseio.com',
  FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET || 'aegis-commerce.firebasestorage.app',
  FIREBASE_SERVICE_ACCOUNT_KEY: process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '',

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'aegis_commerce_super_secret_access_jwt_key_2026_default',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'aegis_commerce_super_secret_refresh_jwt_key_2026_default',
  JWT_ACCESS_EXPIRES_IN: '15m',
  JWT_REFRESH_EXPIRES_IN: '7d',

  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY || '',
  OPENROUTER_MODEL: process.env.OPENROUTER_MODEL || 'google/gemma-4-26b-a4b',

  HUGGINGFACE_API_KEY: process.env.HUGGINGFACE_API_KEY || '',
  HUGGINGFACE_MODEL: process.env.HUGGINGFACE_MODEL || 'google/gemma-4-26B-A4B',

  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  DEMO_MODE: process.env.DEMO_MODE === 'true' || process.env.DEMO_MODE === '1' || true,
};

export function assertSafeConfig(): void {
  // STRICT GOOGLE AI MODEL ENFORCEMENT
  if (!ENV.OPENROUTER_MODEL.toLowerCase().startsWith('google/')) {
    throw new Error(`[AEGIS Policy Violation] Non-Google AI model detected for OpenRouter: ${ENV.OPENROUTER_MODEL}. Only Google Gemma models are permitted.`);
  }

  if (ENV.HUGGINGFACE_MODEL && !ENV.HUGGINGFACE_MODEL.toLowerCase().startsWith('google/')) {
    throw new Error(`[AEGIS Policy Violation] Non-Google AI model detected for Hugging Face: ${ENV.HUGGINGFACE_MODEL}. Only Google Gemma models are permitted.`);
  }

  if (ENV.NODE_ENV === 'production') {
    if (!ENV.OPENROUTER_API_KEY) {
      console.warn('⚠️ [AEGIS Config] OPENROUTER_API_KEY is not defined.');
    }
  }
}
