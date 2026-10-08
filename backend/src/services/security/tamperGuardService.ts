import { TamperEventModel } from '../../models/TamperEvent.js';
import { SecurityEventModel } from '../../models/SecurityEvent.js';
import { ProductModel } from '../../models/Product.js';
import { tamperService } from '../ai/tamperService.js';
import { socketManager } from '../../sockets/socketManager.js';
import { logger } from '../../utils/logger.js';
import { randomUUID } from 'crypto';

export interface ReportTamperDTO {
  type: string;
  resource: string;
  expectedValue?: any;
  observedValue: any;
  userId?: string;
  sessionId?: string;
  metadata?: Record<string, any>;
}

export class TamperGuardService {
  /**
   * Evaluates and records security-relevant client tampering
   */
  public async processTamperEvent(data: ReportTamperDTO) {
    let expected = data.expectedValue;

    // If resource is a product and expectedValue was not provided or resource indicates price
    if (data.resource.startsWith('product:') || data.resource.includes('price')) {
      const parts = data.resource.split(':');
      const productId = parts[1] || parts[0];
      const product = await ProductModel.findOne({ id: productId });
      if (product) {
        expected = data.resource.includes('price') ? product.price : { price: product.price, name: product.name };
      }
    }

    if (expected === undefined) {
      expected = 74999; // baseline authoritative demo value
    }

    // Run AI analysis through Gemma 4 26B
    const analysis = await tamperService.analyzeTampering({
      resource: data.resource,
      expectedValue: expected,
      observedValue: data.observedValue,
      context: data.metadata
    });

    const tamperEventId = randomUUID();
    const tamperRecord = await TamperEventModel.create({
      id: tamperEventId,
      type: data.type || 'DOM_MANIPULATION',
      resource: data.resource,
      expectedValue: expected,
      observedValue: data.observedValue,
      userId: data.userId,
      sessionId: data.sessionId,
      severity: analysis.severity,
      classification: analysis.classification,
      trustBoundaryBreached: analysis.trustBoundaryBreach,
      serverDecision: analysis.serverDecision,
      explanation: analysis.explanation,
      timestamp: new Date()
    });

    // Also record unified SecurityEvent
    await SecurityEventModel.create({
      id: randomUUID(),
      type: 'TAMPER_DETECTED',
      severity: analysis.severity,
      userId: data.userId,
      sessionId: data.sessionId,
      source: 'TamperGuard',
      metadata: {
        resource: data.resource,
        expectedValue: expected,
        observedValue: data.observedValue,
        classification: analysis.classification
      },
      explanation: analysis.explanation,
      timestamp: new Date()
    });

    // Emit real-time WebSocket event
    socketManager.emitTamper({
      id: tamperRecord.id,
      resource: tamperRecord.resource,
      expectedValue: expected,
      observedValue: data.observedValue,
      severity: analysis.severity,
      explanation: analysis.explanation,
      decision: analysis.serverDecision
    });

    socketManager.emitEvent({
      id: tamperRecord.id,
      type: 'TAMPER_DETECTED',
      severity: analysis.severity,
      source: 'TamperGuard',
      explanation: analysis.explanation,
      timestamp: new Date().toISOString()
    });

    logger.security(`Tamper detected on ${data.resource}`, {
      expected,
      observed: data.observedValue,
      decision: analysis.serverDecision
    });

    return {
      tampered: true,
      severity: analysis.severity,
      classification: analysis.classification,
      authoritativeExpected: expected,
      observedClientValue: data.observedValue,
      transactionAllowed: analysis.serverDecision === 'ALLOW',
      serverDecision: analysis.serverDecision,
      explanation: analysis.explanation,
      eventId: tamperRecord.id
    };
  }

  public async getTamperEvents(limit: number = 50) {
    return TamperEventModel.find().sort({ timestamp: -1 }).limit(limit);
  }
}

export const tamperGuardService = new TamperGuardService();
