import { FirestoreModel } from './firestoreModel.js';

export interface ISessionDocument {
  id: string;
  userId: string;
  refreshTokenHash: string;
  ip: string;
  userAgent: string;
  riskScore: number;
  isValid: boolean;
  lastActiveAt: string | Date;
  createdAt: string | Date;
  expiresAt: string | Date;
}

export class SessionModelClass extends FirestoreModel<ISessionDocument> {
  constructor() {
    super('sessions');
  }
}

export const SessionModel = new SessionModelClass();
