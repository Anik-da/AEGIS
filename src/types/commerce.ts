export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'ELECTRONICS' | 'SMARTPHONES' | 'AUDIO' | 'CAMERAS' | 'FASHION' | 'LIFESTYLE' | 'ACCESSORIES';
  subCategory?: string;
  price: number;
  originalPrice?: number;
  formattedPrice: string;
  rating: number;
  reviewsCount: number;
  description: string;
  keySpecs: string[];
  fullSpecs: Record<string, string>;
  images: string[];
  primaryImage: string;
  aiFitScore: number;
  aiFitReason: string;
  intentMatch: 'optimal' | 'drift' | 'neutral';
  badge?: string;
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSpecs?: {
    color?: string;
    warranty?: string;
    ram?: string;
    storage?: string;
  };
  accessoryAddons?: {
    name: string;
    price: number;
  }[];
}

export interface UserShoppingIntent {
  rawQuery: string;
  budgetMax: number;
  currency: string;
  minRam: number;
  primaryUse: string;
  extractedTags: { label: string; value: string; isSatisfied: boolean }[];
  activeDriftPercent: number;
  driftExplanation?: string;
}

export interface OrderConfirmation {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  aegisVerificationReceipt: {
    intentVerified: boolean;
    priceHashMatch: boolean;
    authCryptographicProof: string;
    timestamp: string;
  };
}
