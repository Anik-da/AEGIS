import { Router } from 'express';
import { demoController } from '../controllers/demoController.js';

const router = Router();

router.post('/intent-drift', (req, res) => demoController.demoIntentDrift(req, res));
router.post('/tamper', (req, res) => demoController.demoTamper(req, res));
router.post('/threat', (req, res) => demoController.demoAttackChain(req, res));
router.post('/attack-chain', (req, res) => demoController.demoAttackChain(req, res));
router.post('/heal', (req, res) => demoController.demoHeal(req, res));
router.post('/rollback', (req, res) => demoController.demoRollback(req, res));

export default router;
