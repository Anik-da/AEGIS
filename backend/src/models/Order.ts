import { FirestoreModel } from './firestoreModel.js';
import { IOrder } from '../types/index.js';

export interface IOrderDocument extends IOrder {}

export class OrderModelClass extends FirestoreModel<IOrderDocument> {
  constructor() {
    super('orders');
  }
}

export const OrderModel = new OrderModelClass();
