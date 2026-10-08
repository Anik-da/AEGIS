import { FirestoreModel } from './firestoreModel.js';

export interface IAuditLogDocument {
  id: string;
  actorId?: string;
  action: string;
  targetResource: string;
  details: Record<string, any>;
  ip?: string;
  timestamp: string | Date;
}

export class AuditLogModelClass extends FirestoreModel<IAuditLogDocument> {
  constructor() {
    super('auditLogs');
  }
}

export const AuditLogModel = new AuditLogModelClass();
