import { OrderModel } from '../../models/Order.js';
import { CartModel } from '../../models/Cart.js';
import { ProductModel } from '../../models/Product.js';
import { AuditLogModel } from '../../models/AuditLog.js';
import { cartService } from './cartService.js';
import { logger } from '../../utils/logger.js';
import { randomUUID } from 'crypto';

export interface CreateOrderDTO {
  userId: string;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  intentContractId?: string;
  clientClaimedTotal?: number;
}

export class OrderService {
  /**
   * Complete multi-stage secure checkout
   */
  public async createOrder(data: CreateOrderDTO) {
    const { userId, shippingAddress, intentContractId } = data;

    // 1. Recalculate cart authoritatively
    const recalculated = await cartService.recalculateCart(userId);
    if (recalculated.items.length === 0) {
      throw new Error('Cart is empty. Cannot checkout.');
    }

    // 2. Stock and availability verification
    for (const item of recalculated.items) {
      if (!item.inStock) {
        throw new Error(`Item ${item.productName} has insufficient stock.`);
      }
    }

    // 3. Atomically decrement stock
    for (const item of recalculated.items) {
      await ProductModel.updateOne(
        { id: item.productId, stock: { $gte: item.quantity } },
        { $inc: { stock: -item.quantity } }
      );
    }

    // 4. Create Order with authoritative totals
    const orderId = `ORD-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 8999 + 1000)}`;
    const orderItems = recalculated.items.map(item => ({
      productId: item.productId,
      productName: item.productName,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.itemTotal
    }));

    const order = await OrderModel.create({
      id: orderId,
      userId,
      items: orderItems,
      subtotal: recalculated.subtotal,
      discount: recalculated.discount,
      shipping: recalculated.shipping,
      tax: recalculated.tax,
      total: recalculated.total,
      currency: recalculated.currency,
      status: 'confirmed',
      paymentStatus: 'authorized', // simulated payment for hackathon demo
      shippingAddress,
      intentContractId
    });

    // 5. Clear cart
    await CartModel.updateOne({ userId }, { $set: { items: [], subtotal: 0, discount: 0, shipping: 0, tax: 0, total: 0 } });

    // 6. Write Audit Log
    await AuditLogModel.create({
      id: randomUUID(),
      actorId: userId,
      action: 'ORDER_PLACED',
      targetResource: `order:${orderId}`,
      details: {
        total: order.total,
        itemCount: order.items.length,
        paymentStatus: order.paymentStatus
      }
    });

    logger.info(`✅ Order created successfully: ${orderId} (₹${order.total})`, { orderId, userId });
    return order;
  }

  public async getOrderById(orderId: string, userId?: string) {
    const query: any = { id: orderId };
    if (userId) query.userId = userId;
    return OrderModel.findOne(query);
  }

  public async getUserOrders(userId: string) {
    return OrderModel.find({ userId }).sort({ createdAt: -1 });
  }
}

export const orderService = new OrderService();
