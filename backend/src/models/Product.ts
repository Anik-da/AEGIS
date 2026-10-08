import { FirestoreModel } from './firestoreModel.js';
import { IProduct } from '../types/index.js';

export interface IProductDocument extends IProduct {}

export class ProductModelClass extends FirestoreModel<IProductDocument> {
  constructor() {
    super('products');
  }
}

export const ProductModel = new ProductModelClass();
