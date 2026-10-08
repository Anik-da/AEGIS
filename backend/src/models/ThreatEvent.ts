import { FirestoreModel } from './firestoreModel.js';

export interface IThreatEventDocument {
  id: string;
  threatScore: number;
  attackChain: string[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  primaryHypothesis: string;
  recommendedMitigation: string;
  confidence: number;
  eventsCorrelated: string[];
  userId?: string;
  sessionId?: string;
  ip?: string;
  status: 'active' | 'mitigated' | 'monitoring';
  createdAt: string | Date;
}

export class ThreatEventModelClass extends FirestoreModel<IThreatEventDocument> {
  constructor() {
    super('threatEvents');
  }
}

export const ThreatEventModel = new ThreatEventModelClass();
