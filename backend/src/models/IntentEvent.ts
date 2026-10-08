import { FirestoreModel } from './firestoreModel.js';

export interface IIntentEventDocument {
  id: string;
  userId?: string;
  sessionId?: string;
  type: 'CONTRACT_CREATED' | 'PRODUCT_VIEWED' | 'CART_ADDED' | 'QUANTITY_CHANGED' | 'ADDON_ADDED' | 'CHECKOUT_PRICE_DRIFT';
  payload: any;
  timestamp: string | Date;
}

export class IntentEventModelClass extends FirestoreModel<IIntentEventDocument> {
  constructor() {
    super('intentEvents');
  }
}

export const IntentEventModel = new IntentEventModelClass();
