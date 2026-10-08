import { FirestoreModel } from './firestoreModel.js';
import { IIntentContract } from '../types/index.js';

export interface IIntentContractDocument extends IIntentContract {}

export class IntentContractModelClass extends FirestoreModel<IIntentContractDocument> {
  constructor() {
    super('intentContracts');
  }
}

export const IntentContractModel = new IntentContractModelClass();
