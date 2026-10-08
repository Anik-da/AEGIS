import type { CodeFileIntegrity, HealPipelineStep } from '../types';

export const demoIntegrityFiles: CodeFileIntegrity[] = [
  {
    filename: 'auth.ts',
    hash: 'sha256:7f83b1657ff1...a829',
    expectedHash: 'sha256:7f83b1657ff1...a829',
    status: 'verified',
    lastChecked: '23:14:18',
    securityImpact: 'HIGH',
    diffPreview: {
      removed: ['const userRole = req.headers["x-client-role"];'],
      added: ['const userRole = await aegisSessionValidator.getVerifiedRole(req);'],
    },
  },
  {
    filename: 'checkout.ts',
    hash: 'sha256:4a92c301b88e...f102',
    expectedHash: 'sha256:4a92c301b88e...f102',
    status: 'verified',
    lastChecked: '23:14:15',
    securityImpact: 'NONE',
  },
  {
    filename: 'admin.ts',
    hash: 'sha256:99bc45de8219...30ca',
    expectedHash: 'sha256:99bc45de8219...30ca',
    status: 'verified',
    lastChecked: '23:14:10',
    securityImpact: 'NONE',
  },
  {
    filename: 'api.ts',
    hash: 'sha256:12e455ab99ef...019d',
    expectedHash: 'sha256:12e455ab99ef...019d',
    status: 'verified',
    lastChecked: '23:14:02',
    securityImpact: 'NONE',
  },
];

export const pipelineSteps: HealPipelineStep[] = [
  { id: '1', label: 'DETECT', sublabel: 'Flaw isolation', status: 'passed' },
  { id: '2', label: 'ANALYZE', sublabel: 'AST tree diff', status: 'passed' },
  { id: '3', label: 'GENERATE PATCH', sublabel: 'Zero-trust synth', status: 'passed' },
  { id: '4', label: 'SANDBOX', sublabel: 'Isolated runtime', status: 'passed' },
  { id: '5', label: 'SECURITY TEST', sublabel: 'Fuzzing & Pen-test', status: 'passed' },
  { id: '6', label: 'REGRESSION TEST', sublabel: 'Suite validation', status: 'passed' },
  { id: '7', label: 'POLICY CHECK', sublabel: 'Human gate / rule', status: 'passed' },
  { id: '8', label: 'DEPLOY', sublabel: 'Canary rollout', status: 'passed' },
  { id: '9', label: 'MONITOR', sublabel: 'SLO anomaly track', status: 'passed' },
  { id: '10', label: 'ROLLBACK IF REQ.', sublabel: 'Guaranteed revert', status: 'idle' },
];

export const rollbackScenarioData = {
  vPrevious: 'VERSION 2.4.1',
  vPreviousStatus: 'HEALTHY',
  vNew: 'PATCH 2.4.2',
  vNewStatus: 'REGRESSION DETECTED',
  metric: 'Error Rate Spike: 0.04% -> 12.8%',
  action: 'AUTOMATIC ROLLBACK ENGAGED',
  restoredVersion: 'VERSION 2.4.1 RESTORED',
  recoveryTime: '420ms',
};
