import { Router } from 'express';
import { cartController } from '../controllers/cartController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.use(optionalAuth);

router.get('/', (req, res) => cartController.getCart(req, res));
router.post('/items', (req, res) => cartController.addItem(req, res));
router.patch('/items/:productId', (req, res) => cartController.updateItem(req, res));
router.delete('/items/:productId', (req, res) => cartController.removeItem(req, res));
router.post('/recalculate', (req, res) => cartController.recalculate(req, res));

export default router;
