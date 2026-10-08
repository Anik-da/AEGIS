import { Router } from 'express';
import { authController } from '../controllers/authController.js';
import { validateBody } from '../middleware/validateRequest.js';
import { RegisterSchema, LoginSchema, RefreshTokenSchema } from '../validators/authValidators.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/register', authLimiter, validateBody(RegisterSchema), (req, res) => authController.register(req, res));
router.post('/login', authLimiter, validateBody(LoginSchema), (req, res) => authController.login(req, res));
router.post('/refresh', validateBody(RefreshTokenSchema), (req, res) => authController.refresh(req, res));
router.post('/logout', requireAuth, (req, res) => authController.logout(req, res));
router.get('/me', requireAuth, (req, res) => authController.me(req, res));

export default router;
