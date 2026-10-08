import { Router } from 'express';
import { productController } from '../controllers/productController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

const router = Router();

// Strict server-side role check: only verified 'admin' users
router.use(requireAuth, requireRole(['admin']));

router.post('/products', (req, res) => productController.adminCreateProduct(req, res));
router.patch('/products/:id', (req, res) => productController.adminUpdateProduct(req, res));
router.delete('/products/:id', (req, res) => productController.adminDeleteProduct(req, res));

export default router;
