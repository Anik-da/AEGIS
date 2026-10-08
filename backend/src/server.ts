import http from 'http';
import { createApp } from './app.js';
import { ENV, assertSafeConfig } from './config/env.js';
import { initializeFirebaseAdmin } from './config/firebase.js';
import { socketManager } from './sockets/socketManager.js';
import { logger } from './utils/logger.js';
import { seedDatabase } from './utils/seed.js';

async function bootstrap() {
  try {
    assertSafeConfig();
    logger.info('🛡️ Initializing AEGIS Commerce Backend Engine with Firebase Firestore...');

    // Initialize Firebase Admin SDK (Firestore & Realtime Database)
    initializeFirebaseAdmin();

    // Seed Firestore collections if empty
    await seedDatabase();

    // Create Express app
    const app = createApp();

    // Create HTTP & WebSocket server
    const httpServer = http.createServer(app);
    socketManager.initialize(httpServer);

    const PORT = ENV.PORT;
    httpServer.listen(PORT, () => {
      logger.info(`🚀 AEGIS Commerce backend listening on port ${PORT}`);
      logger.info(`📡 Health Endpoint: http://localhost:${PORT}/health`);
      logger.info(`🛡️ AEGIS API Gateway: http://localhost:${PORT}/api`);
      logger.info(`🔥 Firebase Firestore: Collections active for users, products, categories, carts, orders, etc.`);
      logger.info(`📡 Firebase Realtime Database: https://aegis-commerce-default-rtdb.firebaseio.com`);
      logger.info(`⚡ WebSocket endpoint: ws://localhost:${PORT}/socket.io`);
    });

    const shutdown = async () => {
      logger.info('Stopping AEGIS Commerce backend...');
      httpServer.close(() => {
        process.exit(0);
      });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (err: any) {
    logger.error('Fatal initialization error', err);
    process.exit(1);
  }
}

bootstrap();
