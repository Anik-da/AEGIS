import { FirestoreModel } from './firestoreModel.js';
import { AegisEventType, EventSeverity } from '../types/index.js';

export interface ISecurityEventDocument {
  id: string;
  type: AegisEventType | string;
  severity: EventSeverity | string;
  userId?: string;
  sessionId?: string;
  source: string;
  metadata: Record<string, any>;
  explanation?: string;
  timestamp: string | Date;
}

export class SecurityEventModelClass extends FirestoreModel<ISecurityEventDocument> {
  constructor() {
    super('securityEvents');
  }
}

export const SecurityEventModel = new SecurityEventModelClass();
