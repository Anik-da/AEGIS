import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';
import { cartService } from '../services/commerce/cartService.js';
import { socketManager } from '../sockets/socketManager.js';

export class CartController {
  private getUserId(req: AuthenticatedRequest): string {
    return req.user?.id || (req.headers['x-session-id'] as string) || 'guest-session-1';
  }

  public async getCart(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = this.getUserId(req);
    const cart = await cartService.recalculateCart(userId);
    res.json({ success: true, data: { cart } });
  }

  public async addItem(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = this.getUserId(req);
    const { productId, quantity } = req.body;

    if (!productId) {
      res.status(400).json({ success: false, error: { code: 'PRODUCT_ID_REQUIRED', message: 'productId is required' } });
      return;
    }

    const cart = await cartService.addItem(userId, productId, quantity || 1);
    socketManager.emitEvent({
      type: 'CART_CHANGED',
      userId,
      metadata: { action: 'ADD_ITEM', productId, quantity: quantity || 1, newTotal: cart.total },
      timestamp: new Date().toISOString()
    });

    res.json({ success: true, data: { cart } });
  }

  public async updateItem(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = this.getUserId(req);
    const { productId } = req.params;
    const { quantity } = req.body;

    if (quantity === undefined) {
      res.status(400).json({ success: false, error: { code: 'QUANTITY_REQUIRED', message: 'quantity is required' } });
      return;
    }

    const cart = await cartService.updateItemQuantity(userId, productId, quantity);
    res.json({ success: true, data: { cart } });
  }

  public async removeItem(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = this.getUserId(req);
    const { productId } = req.params;

    const cart = await cartService.removeItem(userId, productId);
    res.json({ success: true, data: { cart } });
  }

  public async recalculate(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = this.getUserId(req);
    // Explicit server recalculation ignoring any client parameters
    const cart = await cartService.recalculateCart(userId);
    res.json({ success: true, data: { cart, recalculatedServerSide: true } });
  }
}

export const cartController = new CartController();
