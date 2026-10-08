import { FirestoreModel } from './firestoreModel.js';
import { ICart } from '../types/index.js';

export interface ICartDocument extends ICart {
  id: string;
}

export class CartModelClass extends FirestoreModel<ICartDocument> {
  constructor() {
    super('carts');
  }
}

export const CartModel = new CartModelClass();
