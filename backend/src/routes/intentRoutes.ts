import { Router } from 'express';
import { intentController } from '../controllers/intentController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';
import { aiLimiter } from '../middleware/rateLimiter.js';
import { validateBody } from '../middleware/validateRequest.js';
import { IntentAnalysisInputSchema, IntentMatchInputSchema } from '../validators/intentValidators.js';

const router = Router();

router.use(optionalAuth);

router.post('/analyze', aiLimiter, validateBody(IntentAnalysisInputSchema), (req, res) => intentController.analyze(req, res));
router.post('/match', validateBody(IntentMatchInputSchema), (req, res) => intentController.match(req, res));
router.post('/events', (req, res) => intentController.recordEvent(req, res));
router.get('/current', (req, res) => intentController.getCurrent(req, res));
router.get('/drift', (req, res) => intentController.getDrift(req, res));
router.get('/timeline', (req, res) => intentController.getTimeline(req, res));

export default router;
