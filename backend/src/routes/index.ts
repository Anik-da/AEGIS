import { Router } from 'express';
import authRoutes from './authRoutes.js';
import productRoutes from './productRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import cartRoutes from './cartRoutes.js';
import orderRoutes from './orderRoutes.js';
import checkoutRoutes from './checkoutRoutes.js';
import intentRoutes from './intentRoutes.js';
import securityRoutes from './securityRoutes.js';
import healRoutes from './healRoutes.js';
import aegisRoutes from './aegisRoutes.js';
import adminRoutes from './adminRoutes.js';
import demoRoutes from './demoRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/checkout', checkoutRoutes);
router.use('/intent', intentRoutes);
router.use('/security', securityRoutes);
router.use('/heal', healRoutes);
router.use('/aegis', aegisRoutes);
router.use('/admin', adminRoutes);
router.use('/demo', demoRoutes);

export default router;
