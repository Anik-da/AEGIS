import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import type { Product, CartItem, UserShoppingIntent, OrderConfirmation } from '../types/commerce';
import { productsCatalog } from '../data/products';
import { aegisAudio } from '../utils/audio';

export type CommerceView = 'home' | 'shop' | 'product' | 'cart' | 'checkout' | 'account' | 'control_center';

interface CommerceContextType {
  // Navigation & Views
  currentView: CommerceView;
  setCurrentView: (view: CommerceView) => void;
  selectedProductId: string;
  setSelectedProductId: (id: string) => void;
  selectedProduct: Product;
  
  // Catalog & Filters
  products: Product[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredProducts: Product[];
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, options?: any) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartTotal: number;
  cartDrawerOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Intent Intelligence
  userIntent: UserShoppingIntent;
  setUserIntent: React.Dispatch<React.SetStateAction<UserShoppingIntent>>;
  cartExceedsBudget: boolean;
  cartBudgetOverage: number;
  dismissedCartNotice: boolean;
  setDismissedCartNotice: (dismissed: boolean) => void;

  // Security & Tampering Demonstrations
  clientTamperActive: boolean;
  clientTamperPrice: number;
  setClientTamperActive: (active: boolean) => void;
  serverAuthoritativePrice: number;
  checkoutBlockedDueToTamper: boolean;

  // Threat & Heal Demonstrations
  threatActive: boolean;
  threatDetails: { type: string; risk: string; action: string } | null;
  triggerThreatSimulation: () => void;
  clearThreatSimulation: () => void;

  healingActive: boolean;
  healingStep: number;
  triggerHealSimulation: () => void;

  // Orders
  lastOrder: OrderConfirmation | null;
  placeOrder: (shippingDetails: any, paymentMethod: string) => boolean;

  // Control Center
  controlCenterOpen: boolean;
  setControlCenterOpen: (open: boolean) => void;

  // Audio
  soundEnabled: boolean;
  toggleSound: () => void;

  // Demo Controls
  triggerIntentDriftDemo: () => void;
  triggerCartMismatchDemo: () => void;
  triggerTamperDemo: () => void;
  resetAllDemos: () => void;
}

const initialIntent: UserShoppingIntent = {
  rawQuery: "I need a laptop under ₹80,000, minimum 32GB RAM, mainly for AI/ML.",
  budgetMax: 80000,
  currency: "₹",
  minRam: 32,
  primaryUse: "AI / ML Workstation",
  extractedTags: [
    { label: "BUDGET", value: "≤ ₹80,000", isSatisfied: true },
    { label: "RAM", value: "32GB+", isSatisfied: true },
    { label: "USE", value: "AI / ML Workstation", isSatisfied: true },
  ],
  activeDriftPercent: 0,
  driftExplanation: undefined
};

// Initial Cart with typical realistic items
const initialCart: CartItem[] = [
  {
    product: productsCatalog[0], // AEGIS Pro X1 (₹74,999)
    quantity: 1,
    accessoryAddons: [
      { name: "AEGIS Care+ 2-Yr Warranty", price: 9999 },
      { name: "Magnetic 140W GaN Travel Pack", price: 4999 }
    ]
  }
];

const CommerceContext = createContext<CommerceContextType | undefined>(undefined);

export const CommerceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<CommerceView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('aegis-pro-x1');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>(['aegis-pro-x1', 'obsidian-acoustic-anc']);
  const [userIntent, setUserIntent] = useState<UserShoppingIntent>(initialIntent);
  const [dismissedCartNotice, setDismissedCartNotice] = useState(false);
  
  // Tampering simulation
  const [clientTamperActive, setClientTamperActive] = useState(false);
  const clientTamperPrice = 1; // Simulated ₹1 browser DOM hack
  const serverAuthoritativePrice = 74999;
  const checkoutBlockedDueToTamper = clientTamperActive;

  // Threat simulation
  const [threatActive, setThreatActive] = useState(false);
  const [threatDetails, setThreatDetails] = useState<{ type: string; risk: string; action: string } | null>(null);

  // Healing simulation
  const [healingActive, setHealingActive] = useState(false);
  const [healingStep, setHealingStep] = useState(0);

  // Order
  const [lastOrder, setLastOrder] = useState<OrderConfirmation | null>(null);

  // Control Center modal
  const [controlCenterOpen, setControlCenterOpen] = useState(false);

  // Audio
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    aegisAudio.enabled = next;
  };

  const selectedProduct = useMemo(() => {
    return productsCatalog.find(p => p.id === selectedProductId) || productsCatalog[0];
  }, [selectedProductId]);

  const filteredProducts = useMemo(() => {
    return productsCatalog.filter(p => {
      const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Cart calculations
  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const base = item.product.price * item.quantity;
      const addons = (item.accessoryAddons || []).reduce((aSum, a) => aSum + a.price, 0) * item.quantity;
      return sum + base + addons;
    }, 0);
  }, [cart]);

  const cartTotal = cartSubtotal; // Free shipping on premium items

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // Cart budget check: Compare cart total with userIntent.budgetMax
  const cartExceedsBudget = cartTotal > userIntent.budgetMax;
  const cartBudgetOverage = Math.max(0, cartTotal - userIntent.budgetMax);

  const addToCart = useCallback((product: Product, quantity = 1, options?: any) => {
    aegisAudio.playClick();
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity, accessoryAddons: options?.accessoryAddons || [] }];
    });
    setCartDrawerOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    aegisAudio.playClick();
    setCart(prev => prev.filter(item => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, delta: number) => {
    aegisAudio.playClick();
    setCart(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const next = item.quantity + delta;
            return next > 0 ? { ...item, quantity: next } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    aegisAudio.playClick();
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  }, []);

  const isWishlisted = useCallback((productId: string) => {
    return wishlist.includes(productId);
  }, [wishlist]);

  // Threat trigger
  const triggerThreatSimulation = useCallback(() => {
    aegisAudio.playAlert();
    setThreatActive(true);
    setThreatDetails({
      type: 'ABNORMAL SESSION BEHAVIOR (Automated Credential Stuffer)',
      risk: 'HIGH',
      action: 'BLOCKED (Rate-limited & Session Isolated)'
    });
  }, []);

  const clearThreatSimulation = useCallback(() => {
    aegisAudio.playVerify();
    setThreatActive(false);
    setThreatDetails(null);
  }, []);

  // Healing trigger
  const triggerHealSimulation = useCallback(() => {
    aegisAudio.playAlert();
    setHealingActive(true);
    setHealingStep(1);

    const steps = [2, 3, 4, 5, 6, 7];
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setHealingStep(step);
        if (step === 7) {
          aegisAudio.playVerify();
        } else {
          aegisAudio.playClick();
        }
      }, (idx + 1) * 800);
    });
  }, []);

  // Place order flow
  const placeOrder = useCallback((shippingDetails: any, paymentMethod: string) => {
    if (clientTamperActive) {
      aegisAudio.playAlert();
      return false; // Server blocked!
    }

    aegisAudio.playVerify();
    const order: OrderConfirmation = {
      orderId: `AEGIS-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      items: [...cart],
      subtotal: cartSubtotal,
      tax: Math.round(cartSubtotal * 0.18),
      shipping: 0,
      total: cartTotal,
      shippingAddress: shippingDetails,
      paymentMethod,
      aegisVerificationReceipt: {
        intentVerified: !cartExceedsBudget,
        priceHashMatch: true,
        authCryptographicProof: `SHA-256: 0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`,
        timestamp: new Date().toLocaleTimeString(),
      }
    };

    setLastOrder(order);
    clearCart();
    return true;
  }, [cart, cartSubtotal, cartTotal, clientTamperActive, cartExceedsBudget, clearCart]);

  // Demo Controls
  const triggerIntentDriftDemo = useCallback(() => {
    aegisAudio.playAlert();
    // Swap user intent to show 31% drift with Ultrabook Stealth X
    setSelectedProductId('ultrabook-stealth-x');
    setUserIntent(prev => ({
      ...prev,
      activeDriftPercent: 69, // 31% match
      driftExplanation: "Your current item (₹89,999 with 16GB RAM) progressively deviates from your stated ₹80K / 32GB RAM intent."
    }));
  }, []);

  const triggerCartMismatchDemo = useCallback(() => {
    aegisAudio.playAlert();
    // Add an expensive bundle to exceed budget
    const ultraBook = productsCatalog.find(p => p.id === 'ultrabook-stealth-x')!;
    addToCart(ultraBook, 1);
    setDismissedCartNotice(false);
  }, [addToCart]);

  const triggerTamperDemo = useCallback(() => {
    aegisAudio.playAlert();
    setClientTamperActive(true);
  }, []);

  const resetAllDemos = useCallback(() => {
    aegisAudio.playVerify();
    setCart(initialCart);
    setUserIntent(initialIntent);
    setClientTamperActive(false);
    setThreatActive(false);
    setThreatDetails(null);
    setHealingActive(false);
    setHealingStep(0);
    setDismissedCartNotice(false);
    setSelectedProductId('aegis-pro-x1');
  }, []);

  return (
    <CommerceContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedProductId,
        setSelectedProductId,
        selectedProduct,
        products: productsCatalog,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        filteredProducts,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartTotal,
        cartDrawerOpen,
        setCartDrawerOpen,
        wishlist,
        toggleWishlist,
        isWishlisted,
        userIntent,
        setUserIntent,
        cartExceedsBudget,
        cartBudgetOverage,
        dismissedCartNotice,
        setDismissedCartNotice,
        clientTamperActive,
        clientTamperPrice,
        setClientTamperActive,
        serverAuthoritativePrice,
        checkoutBlockedDueToTamper,
        threatActive,
        threatDetails,
        triggerThreatSimulation,
        clearThreatSimulation,
        healingActive,
        healingStep,
        triggerHealSimulation,
        lastOrder,
        placeOrder,
        controlCenterOpen,
        setControlCenterOpen,
        soundEnabled,
        toggleSound,
        triggerIntentDriftDemo,
        triggerCartMismatchDemo,
        triggerTamperDemo,
        resetAllDemos
      }}
    >
      {children}
    </CommerceContext.Provider>
  );
};

export const useCommerce = () => {
  const context = useContext(CommerceContext);
  if (!context) {
    throw new Error('useCommerce must be used within a CommerceProvider');
  }
  return context;
};
