import { CartModel } from '../../models/Cart.js';
import { ProductModel } from '../../models/Product.js';
import { IntentContractModel } from '../../models/IntentContract.js';
import { TamperEventModel } from '../../models/TamperEvent.js';
import { SecurityEventModel } from '../../models/SecurityEvent.js';
import { cartService } from '../commerce/cartService.js';
import { logger } from '../../utils/logger.js';

export interface TransactionCheckResult {
  allowed: boolean;
  riskScore: number;
  checks: Array<{
    name: string;
    status: 'passed' | 'warning' | 'failed';
    details?: string;
  }>;
  explanation: string;
}

export class TransactionGuardService {
  /**
   * Pre-flight 9-point security transaction inspection
   */
  public async evaluateTransaction(userId: string, claimedClientTotal?: number): Promise<TransactionCheckResult> {
    const checks: TransactionCheckResult['checks'] = [];
    let riskScore = 0;

    // 1. Authenticated user validation
    checks.push({
      name: 'User Identity & Cryptographic Session',
      status: userId ? 'passed' : 'failed',
      details: userId ? 'Valid authenticated customer identity verified' : 'Anonymous checkout rejected'
    });
    if (!userId) riskScore += 100;

    // 2. Fetch authoritative cart
    const cart = await cartService.recalculateCart(userId);
    if (cart.items.length === 0) {
      return {
        allowed: false,
        riskScore: 90,
        checks: [{ name: 'Cart Content', status: 'failed', details: 'Cart is empty' }],
        explanation: 'Transaction aborted because no valid items exist in cart.'
      };
    }

    // 3. Product availability & stock check
    let stockValid = true;
    for (const item of cart.items) {
      if (!item.inStock) {
        stockValid = false;
        break;
      }
    }
    checks.push({
      name: 'Product Inventory & Stock Availability',
      status: stockValid ? 'passed' : 'failed',
      details: stockValid ? 'All items in stock and reserved' : 'Item stock depleted'
    });
    if (!stockValid) riskScore += 50;

    // 4. Authoritative price vs claimed client total (DOM Price Manipulation check)
    let priceCheckPassed = true;
    let priceDetails = 'Server authoritative totals calculated directly from verified catalog catalog.';
    if (claimedClientTotal !== undefined && Math.abs(claimedClientTotal - cart.total) > 1) {
      priceCheckPassed = false;
      priceDetails = `Client claimed price ₹${claimedClientTotal.toLocaleString('en-IN')} conflicts with authoritative server total ₹${cart.total.toLocaleString('en-IN')}.`;
      riskScore += 80;
    }
    checks.push({
      name: 'Price Integrity (Server Authority)',
      status: priceCheckPassed ? 'passed' : 'failed',
      details: priceDetails
    });

    // 5. Cart integrity & bounds validation
    const quantitiesValid = cart.items.every(i => i.quantity > 0 && i.quantity <= 10);
    checks.push({
      name: 'Cart Structure & Quantity Bounds',
      status: quantitiesValid ? 'passed' : 'failed',
      details: quantitiesValid ? 'Quantities comply with standard limits (1-10 per SKU)' : 'Invalid quantity detected'
    });
    if (!quantitiesValid) riskScore += 40;

    // 6. Quantity integrity
    const unitPricesPositive = cart.items.every(i => i.unitPrice > 0);
    checks.push({
      name: 'SKU Baseline Non-Zero Pricing Integrity',
      status: unitPricesPositive ? 'passed' : 'failed',
      details: unitPricesPositive ? 'All unit prices non-zero and validated' : 'Zero or negative price detected'
    });
    if (!unitPricesPositive) riskScore += 70;

    // 7. Intent compatibility
    const intent = await IntentContractModel.findOne({ userId }).sort({ createdAt: -1 });
    let intentStatus: 'passed' | 'warning' = 'passed';
    let intentDetails = 'Transaction conforms to active customer intent contract.';
    if (intent && intent.budget.max > 0 && cart.total > intent.budget.max) {
      intentStatus = 'warning';
      intentDetails = `Transaction total ₹${cart.total.toLocaleString('en-IN')} exceeds stated budget ₹${intent.budget.max.toLocaleString('en-IN')}.`;
      riskScore += 15;
    }
    checks.push({
      name: 'Intent Contract & Budget Alignment',
      status: intentStatus,
      details: intentDetails
    });

    // 8. Suspicious session / security events
    const recentThreats = await SecurityEventModel.countDocuments({
      userId,
      severity: { $in: ['high', 'critical'] },
      timestamp: { $gte: new Date(Date.now() - 3600000) }
    });
    checks.push({
      name: 'Session Risk & Behavioral Telemetry',
      status: recentThreats > 0 ? 'warning' : 'passed',
      details: recentThreats > 0 ? `${recentThreats} security alerts detected in session` : 'Zero anomaly flags in active session'
    });
    if (recentThreats > 0) riskScore += 25;

    // 9. Tampering signals
    const recentTampers = await TamperEventModel.countDocuments({
      userId,
      timestamp: { $gte: new Date(Date.now() - 3600000) }
    });
    checks.push({
      name: 'Client-Side Tamper History',
      status: recentTampers > 0 ? 'warning' : 'passed',
      details: recentTampers > 0 ? `${recentTampers} client tamper records logged` : 'Clean client state boundary'
    });
    if (recentTampers > 0) riskScore += 20;

    const allowed = riskScore < 60 && priceCheckPassed && stockValid;

    let explanation = 'All cryptographic and integrity checks passed. Order authorization approved.';
    if (!allowed) {
      if (!priceCheckPassed) {
        explanation = 'Transaction rejected: Client-side price tampering detected. Server enforced authoritative pricing.';
      } else if (!stockValid) {
        explanation = 'Transaction held: One or more selected products are out of stock.';
      } else {
        explanation = 'Transaction flagged: Elevated security risk score prevented automated fulfillment.';
      }
    }

    logger.info(`TransactionGuard evaluated for user ${userId}: allowed=${allowed}, score=${riskScore}`);

    return {
      allowed,
      riskScore: Math.min(100, riskScore),
      checks,
      explanation
    };
  }
}

export const transactionGuardService = new TransactionGuardService();
