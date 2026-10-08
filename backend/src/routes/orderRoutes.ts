import { Router } from 'express';
import { checkoutController } from '../controllers/checkoutController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { checkoutLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.use(requireAuth);

router.post('/', checkoutLimiter, (req, res) => checkoutController.placeOrder(req, res));
router.get('/', (req, res) => checkoutController.getUserOrders(req, res));
router.get('/:id', (req, res) => checkoutController.getOrderById(req, res));

export default router;
