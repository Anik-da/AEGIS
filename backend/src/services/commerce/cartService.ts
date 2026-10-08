import { CartModel, ICartDocument } from '../../models/Cart.js';
import { ProductModel } from '../../models/Product.js';
import { logger } from '../../utils/logger.js';

export interface RecalculatedCart {
  userId: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    itemTotal: number;
    inStock: boolean;
  }>;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  currency: string;
}

export class CartService {
  /**
   * Recalculates cart totals using authoritative product prices from MongoDB
   */
  public async recalculateCart(userId: string): Promise<RecalculatedCart> {
    let cart = await CartModel.findOne({ userId });
    if (!cart) {
      cart = await CartModel.create({
        userId,
        items: [],
        subtotal: 0,
        discount: 0,
        shipping: 0,
        tax: 0,
        total: 0
      });
    }

    if (cart.items.length === 0) {
      return {
        userId,
        items: [],
        subtotal: 0,
        discount: 0,
        shipping: 0,
        tax: 0,
        total: 0,
        currency: 'INR'
      };
    }

    const productIds = cart.items.map(item => item.productId);
    const products = await ProductModel.find({ id: { $in: productIds } });
    const productMap = new Map(products.map(p => [p.id, p]));

    let calculatedSubtotal = 0;
    const verifiedItems = [];

    for (const item of cart.items) {
      const product = productMap.get(item.productId);
      if (!product) {
        logger.warn(`Product ${item.productId} in cart not found in catalog, skipping`);
        continue;
      }

      // CRITICAL: Use product.price from database, NEVER untrusted client input!
      const authoritativeUnitPrice = product.price;
      const validQuantity = Math.max(1, Math.min(item.quantity, 10)); // bounds check
      const itemTotal = authoritativeUnitPrice * validQuantity;
      calculatedSubtotal += itemTotal;

      verifiedItems.push({
        productId: product.id,
        productName: product.name,
        quantity: validQuantity,
        unitPrice: authoritativeUnitPrice,
        itemTotal,
        inStock: product.stock >= validQuantity
      });
    }

    // Server-side deterministic financial calculations
    const shipping = calculatedSubtotal > 50000 || calculatedSubtotal === 0 ? 0 : 499;
    const discount = calculatedSubtotal > 100000 ? 5000 : 0;
    const tax = Math.round(calculatedSubtotal * 0.18); // 18% GST
    const calculatedTotal = calculatedSubtotal - discount + shipping + tax;

    // Persist authoritative numbers back to database
    cart.subtotal = calculatedSubtotal;
    cart.discount = discount;
    cart.shipping = shipping;
    cart.tax = tax;
    cart.total = calculatedTotal;
    await CartModel.updateOne({ userId }, cart);

    return {
      userId,
      items: verifiedItems,
      subtotal: calculatedSubtotal,
      discount,
      shipping,
      tax,
      total: calculatedTotal,
      currency: 'INR'
    };
  }

  public async addItem(userId: string, productId: string, quantity: number = 1): Promise<RecalculatedCart> {
    const product = await ProductModel.findOne({ id: productId });
    if (!product) throw new Error(`Product ${productId} not found`);

    let cart = await CartModel.findOne({ userId });
    if (!cart) {
      cart = await CartModel.create({ userId, items: [] });
    }

    const existingIndex = cart.items.findIndex(i => i.productId === productId);
    if (existingIndex > -1) {
      cart.items[existingIndex].quantity += quantity;
      cart.items[existingIndex].unitPriceSnapshot = product.price;
    } else {
      cart.items.push({
        productId,
        quantity,
        unitPriceSnapshot: product.price
      });
    }

    await CartModel.updateOne({ userId }, cart);
    return this.recalculateCart(userId);
  }

  public async updateItemQuantity(userId: string, productId: string, quantity: number): Promise<RecalculatedCart> {
    const cart = await CartModel.findOne({ userId });
    if (!cart) throw new Error('Cart not found');

    if (quantity <= 0) {
      cart.items = cart.items.filter(i => i.productId !== productId) as any;
    } else {
      const item = cart.items.find(i => i.productId === productId);
      if (item) {
        item.quantity = Math.min(10, quantity);
      }
    }

    await CartModel.updateOne({ userId }, cart);
    return this.recalculateCart(userId);
  }

  public async removeItem(userId: string, productId: string): Promise<RecalculatedCart> {
    const cart = await CartModel.findOne({ userId });
    if (!cart) throw new Error('Cart not found');

    cart.items = cart.items.filter(i => i.productId !== productId) as any;
    await CartModel.updateOne({ userId }, cart);
    return this.recalculateCart(userId);
  }
}

export const cartService = new CartService();
