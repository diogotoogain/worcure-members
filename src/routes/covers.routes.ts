import { Router, Request, Response, NextFunction } from 'express';
import { CoverGenerationService } from '../services/coverGeneration.service.js';
import { coverGenerationSchema, validateRequest } from '../utils/validation.js';
import type { CoverGenerationRequest } from '../types/cover.types.js';

const router = Router();
const coverService = new CoverGenerationService();

/**
 * POST /api/covers/generate
 * Generate a cover using AI
 */
router.post('/generate', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate request body
    const validatedData = validateRequest<CoverGenerationRequest>(coverGenerationSchema, req.body);

    // Validate prompt
    await coverService.validatePrompt(validatedData.prompt);

    // Generate cover
    const result = await coverService.generateCover(validatedData);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/covers/health
 * Health check endpoint
 */
router.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Cover generation service is healthy',
    timestamp: new Date().toISOString(),
  });
});

export default router;
