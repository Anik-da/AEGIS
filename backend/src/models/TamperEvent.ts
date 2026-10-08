import { FirestoreModel } from './firestoreModel.js';
import { EventSeverity } from '../types/index.js';

export interface ITamperEventDocument {
  id: string;
  type: string;
  resource: string;
  expectedValue: any;
  observedValue: any;
  userId?: string;
  sessionId?: string;
  severity: EventSeverity;
  classification: string;
  trustBoundaryBreached: boolean;
  serverDecision: 'ALLOW' | 'REJECT' | 'REVOKE_SESSION';
  explanation: string;
  timestamp: string | Date;
}

export class TamperEventModelClass extends FirestoreModel<ITamperEventDocument> {
  constructor() {
    super('tamperEvents');
  }
}

export const TamperEventModel = new TamperEventModelClass();
