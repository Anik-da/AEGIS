import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';
import { transactionGuardService } from '../services/security/transactionGuardService.js';
import { orderService } from '../services/commerce/orderService.js';
import { socketManager } from '../sockets/socketManager.js';

export class CheckoutController {
  public async validateCheckout(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = req.user?.id || (req.headers['x-session-id'] as string) || 'guest-session-1';
    const { clientClaimedTotal } = req.body;

    const evaluation = await transactionGuardService.evaluateTransaction(userId, clientClaimedTotal);

    socketManager.emitEvent({
      type: 'TRANSACTION_CHECK',
      userId,
      severity: evaluation.allowed ? 'low' : 'high',
      metadata: { allowed: evaluation.allowed, riskScore: evaluation.riskScore },
      explanation: evaluation.explanation,
      timestamp: new Date().toISOString()
    });

    res.json({
      success: true,
      data: {
        allowed: evaluation.allowed,
        riskScore: evaluation.riskScore,
        checks: evaluation.checks,
        explanation: evaluation.explanation
      }
    });
  }

  public async placeOrder(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'You must be logged in to complete checkout.' }
      });
      return;
    }

    const { shippingAddress, intentContractId, clientClaimedTotal } = req.body;

    // Step 8: Run AEGIS transaction protection before order creation
    const preflight = await transactionGuardService.evaluateTransaction(userId, clientClaimedTotal);
    if (!preflight.allowed) {
      res.status(400).json({
        success: false,
        error: {
          code: 'TRANSACTION_BLOCKED_BY_AEGIS',
          message: preflight.explanation,
          riskScore: preflight.riskScore,
          checks: preflight.checks
        }
      });
      return;
    }

    try {
      const order = await orderService.createOrder({
        userId,
        shippingAddress: shippingAddress || {
          fullName: 'Customer',
          street: '10 Cyber Defense Boulevard',
          city: 'Bengaluru',
          state: 'Karnataka',
          postalCode: '560001',
          country: 'India'
        },
        intentContractId,
        clientClaimedTotal
      });

      socketManager.emitEvent({
        type: 'CHECKOUT_STARTED',
        userId,
        metadata: { orderId: order.id, total: order.total },
        explanation: `Order ${order.id} confirmed and verified by AEGIS TransactionGuard.`,
        timestamp: new Date().toISOString()
      });

      res.status(201).json({
        success: true,
        data: { order }
      });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        error: { code: 'ORDER_CREATION_FAILED', message: err.message }
      });
    }
  }

  public async getUserOrders(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required' } });
      return;
    }
    const orders = await orderService.getUserOrders(userId);
    res.json({ success: true, data: { orders } });
  }

  public async getOrderById(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const order = await orderService.getOrderById(id, req.user?.id);
    if (!order) {
      res.status(404).json({ success: false, error: { code: 'ORDER_NOT_FOUND', message: 'Order not found' } });
      return;
    }
    res.json({ success: true, data: { order } });
  }
}

export const checkoutController = new CheckoutController();
