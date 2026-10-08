import { Router } from 'express';
import { productController } from '../controllers/productController.js';

const router = Router();

router.get('/', (req, res) => productController.getCategories(req, res));

export default router;
