import { Router } from 'express';
import { productController } from '../controllers/productController.js';

const router = Router();

router.get('/', (req, res) => productController.getProducts(req, res));
router.get('/search', (req, res) => productController.search(req, res));
router.get('/:id', (req, res) => productController.getProductById(req, res));
router.get('/:id/recommendations', (req, res) => productController.getRecommendations(req, res));

export default router;
