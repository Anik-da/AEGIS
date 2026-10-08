import { FirestoreModel } from './firestoreModel.js';

export interface IRepairEventDocument {
  id: string;
  patchId: string;
  version: string;
  previousVersion: string;
  filePath: string;
  rootCause: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  candidatePatch: string;
  testsRequired: string[];
  testsPassed: boolean;
  securityChecksPassed: boolean;
  verified: boolean;
  deployed: boolean;
  rolledBack: boolean;
  rollbackReason?: string;
  timestamp: string | Date;
}

export class RepairEventModelClass extends FirestoreModel<IRepairEventDocument> {
  constructor() {
    super('repairEvents');
  }
}

export const RepairEventModel = new RepairEventModelClass();
