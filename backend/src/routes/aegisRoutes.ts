import { Router } from 'express';
import { aegisController } from '../controllers/aegisController.js';

const router = Router();

router.get('/overview', (req, res) => aegisController.getOverview(req, res));
router.get('/events', (req, res) => aegisController.getEvents(req, res));
router.get('/threats', (req, res) => aegisController.getThreats(req, res));
router.get('/tampering', (req, res) => aegisController.getTampering(req, res));
router.get('/intent', (req, res) => aegisController.getIntent(req, res));
router.get('/repairs', (req, res) => aegisController.getRepairs(req, res));
router.get('/attack-chains', (req, res) => aegisController.getAttackChains(req, res));
router.get('/security-score', (req, res) => aegisController.getSecurityScore(req, res));

export default router;
