import { Request, Response } from 'express';
import { healService } from '../services/heal/healService.js';
import { rollbackService } from '../services/heal/rollbackService.js';

export class HealController {
  public async analyze(req: Request, res: Response): Promise<void> {
    const { filePath, code, error, context } = req.body;
    const analysis = await healService.analyzeVulnerability({ filePath, code, error, context });
    res.json({ success: true, data: { analysis } });
  }

  public async generatePatch(req: Request, res: Response): Promise<void> {
    const { problem, code, analysis } = req.body;
    const candidatePatch = await healService.generatePatch({ problem, code, analysis });
    res.json({ success: true, data: candidatePatch });
  }

  public async verifyPatch(req: Request, res: Response): Promise<void> {
    const { patchId, filePath, rootCause, severity, candidatePatch } = req.body;
    const result = await healService.verifyAndStagePatch({
      patchId: patchId || `PATCH-${Date.now().toString(36).toUpperCase()}`,
      filePath: filePath || 'src/validators/checkoutValidator.ts',
      rootCause: rootCause || 'Client price override defect',
      severity,
      candidatePatch
    });

    res.json({ success: true, data: result });
  }

  public async rollback(req: Request, res: Response): Promise<void> {
    const { reason } = req.body;
    const result = await rollbackService.executeRollback(reason);
    res.json({ success: true, data: result });
  }

  public async getVersions(req: Request, res: Response): Promise<void> {
    const versions = rollbackService.getVersions();
    res.json({ success: true, data: versions });
  }

  public async getEvents(req: Request, res: Response): Promise<void> {
    const events = await healService.getRepairEvents();
    res.json({ success: true, data: { events } });
  }
}

export const healController = new HealController();
