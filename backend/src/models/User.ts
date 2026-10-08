import { FirestoreModel } from './firestoreModel.js';
import { UserRole } from '../types/index.js';

export interface IUserDocument {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  failedLoginAttempts: number;
  lockoutUntil?: string | Date;
  lastLoginAt?: string | Date;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export class UserModelClass extends FirestoreModel<IUserDocument> {
  constructor() {
    super('users');
  }
}

export const UserModel = new UserModelClass();
