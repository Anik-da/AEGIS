import { Router } from 'express';
import { securityController } from '../controllers/securityController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';
import { aiLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.use(optionalAuth);

router.post('/analyze-event', aiLimiter, (req, res) => securityController.analyzeEvent(req, res));
router.get('/events', (req, res) => securityController.getEvents(req, res));
router.get('/threats', (req, res) => securityController.getThreats(req, res));
router.get('/attack-chains', (req, res) => securityController.getAttackChains(req, res));
router.post('/tamper-event', (req, res) => securityController.reportTamper(req, res));
router.get('/tamper-events', (req, res) => securityController.getTamperEvents(req, res));
router.post('/transaction-check', (req, res) => securityController.checkTransaction(req, res));

export default router;
