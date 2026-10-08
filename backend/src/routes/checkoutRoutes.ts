import { Router } from 'express';
import { checkoutController } from '../controllers/checkoutController.js';
import { optionalAuth, requireAuth } from '../middleware/authMiddleware.js';
import { checkoutLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/validate', optionalAuth, checkoutLimiter, (req, res) => checkoutController.validateCheckout(req, res));

export default router;
