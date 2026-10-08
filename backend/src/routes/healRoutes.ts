import { Router } from 'express';
import { healController } from '../controllers/healController.js';
import { aiLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/analyze', aiLimiter, (req, res) => healController.analyze(req, res));
router.post('/generate-patch', aiLimiter, (req, res) => healController.generatePatch(req, res));
router.post('/verify-patch', (req, res) => healController.verifyPatch(req, res));
router.post('/rollback', (req, res) => healController.rollback(req, res));
router.get('/versions', (req, res) => healController.getVersions(req, res));
router.get('/events', (req, res) => healController.getEvents(req, res));

export default router;
