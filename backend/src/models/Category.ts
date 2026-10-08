import { FirestoreModel } from './firestoreModel.js';

export interface ICategoryDocument {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export class CategoryModelClass extends FirestoreModel<ICategoryDocument> {
  constructor() {
    super('categories');
  }
}

export const CategoryModel = new CategoryModelClass();
