export type UserRole = 'customer' | 'admin';

export interface IUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  failedLoginAttempts?: number;
  lockoutUntil?: Date;
}

export interface IProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  currency: string;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  specifications: Record<string, any>;
  tags: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICartItem {
  productId: string;
  quantity: number;
  unitPriceSnapshot: number;
}

export interface ICart {
  userId: string;
  items: ICartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'authorized' | 'failed' | 'refunded';

export interface IOrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface IOrder {
  id: string;
  userId: string;
  items: IOrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  currency: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  intentContractId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IIntentContract {
  id: string;
  userId?: string;
  goal: string;
  budget: {
    max: number;
    currency: string;
  };
  hardConstraints: string[];
  preferences: string[];
  exclusions: string[];
  priorities: string[];
  riskLevel: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
}

export type AegisEventType =
  | 'INTENT_CREATED'
  | 'INTENT_UPDATED'
  | 'INTENT_DRIFT'
  | 'PRODUCT_VIEWED'
  | 'CART_CHANGED'
  | 'CHECKOUT_STARTED'
  | 'TRANSACTION_CHECK'
  | 'LOGIN_FAILED'
  | 'LOGIN_SUCCESS'
  | 'SUSPICIOUS_SESSION'
  | 'THREAT_DETECTED'
  | 'ATTACK_CHAIN_DETECTED'
  | 'TAMPER_DETECTED'
  | 'CODE_ERROR'
  | 'PATCH_GENERATED'
  | 'PATCH_VERIFIED'
  | 'REPAIR_DEPLOYED'
  | 'ROLLBACK_TRIGGERED';

export type EventSeverity = 'cosmetic' | 'low' | 'medium' | 'high' | 'critical';

export interface IAegisEvent {
  id: string;
  type: AegisEventType;
  severity: EventSeverity;
  userId?: string;
  sessionId?: string;
  source: string;
  metadata: Record<string, any>;
  explanation?: string;
  timestamp: Date;
}
