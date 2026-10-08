import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { ENV } from '../config/env.js';
import { realtimeDb } from '../config/firebase.js';
import { logger } from '../utils/logger.js';

export class SocketManager {
  private io: SocketIOServer | null = null;

  public initialize(httpServer: HttpServer): void {
    this.io = new SocketIOServer(httpServer, {
      path: '/socket.io',
      cors: {
        origin: [ENV.FRONTEND_URL, 'http://localhost:5173', 'http://127.0.0.1:5173', '*'],
        methods: ['GET', 'POST'],
        credentials: true
      }
    });

    this.io.on('connection', (socket: Socket) => {
      logger.info(`⚡ [WebSocket] Client connected: ${socket.id}`);

      socket.on('disconnect', () => {
        logger.info(`⚡ [WebSocket] Client disconnected: ${socket.id}`);
      });

      socket.on('subscribe:aegis', () => {
        socket.join('aegis-telemetry');
        logger.info(`⚡ [WebSocket] Socket ${socket.id} subscribed to aegis-telemetry`);
      });
    });

    // Initialize Realtime Database status node
    try {
      realtimeDb.ref('aegis/status').set({
        online: true,
        lastHeartbeat: new Date().toISOString(),
        engine: 'AEGIS Autonomous Defense Subsystem'
      });
      logger.info('📡 Firebase Realtime Database synchronization active.');
    } catch (err: any) {
      logger.warn(`Notice on Realtime DB initialization: ${err.message}`);
    }

    logger.info('✅ Socket.IO real-time event engine initialized.');
  }

  public emitEvent(event: any): void {
    if (this.io) {
      this.io.emit('aegis:event', event);
    }
    // Mirror to Firebase Realtime Database
    try {
      realtimeDb.ref('aegis/events').push({
        ...event,
        serverTimestamp: new Date().toISOString()
      });
    } catch {
      // ignore
    }
  }

  public emitThreat(threatData: any): void {
    if (this.io) {
      this.io.emit('aegis:threat', threatData);
    }
    try {
      realtimeDb.ref('aegis/threats').set({
        ...threatData,
        updatedAt: new Date().toISOString()
      });
    } catch {
      // ignore
    }
  }

  public emitTamper(tamperData: any): void {
    if (this.io) {
      this.io.emit('aegis:tamper', tamperData);
    }
    try {
      realtimeDb.ref('aegis/tamper').set({
        ...tamperData,
        updatedAt: new Date().toISOString()
      });
    } catch {
      // ignore
    }
  }

  public emitIntent(intentData: any): void {
    if (this.io) {
      this.io.emit('aegis:intent', intentData);
    }
    try {
      realtimeDb.ref('aegis/intent').set({
        ...intentData,
        updatedAt: new Date().toISOString()
      });
    } catch {
      // ignore
    }
  }

  public emitRepair(repairData: any): void {
    if (this.io) {
      this.io.emit('aegis:repair', repairData);
    }
    try {
      realtimeDb.ref('aegis/repairs').set({
        ...repairData,
        updatedAt: new Date().toISOString()
      });
    } catch {
      // ignore
    }
  }

  public emitRollback(rollbackData: any): void {
    if (this.io) {
      this.io.emit('aegis:rollback', rollbackData);
    }
    try {
      realtimeDb.ref('aegis/rollback').set({
        ...rollbackData,
        updatedAt: new Date().toISOString()
      });
    } catch {
      // ignore
    }
  }
}

export const socketManager = new SocketManager();
