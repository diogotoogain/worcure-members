import OpenAI from 'openai';
import { config } from '../config/index.js';
import type {
  CoverGenerationRequest,
  CoverGenerationResponse,
  AIProviderConfig,
} from '../types/cover.types.js';

export class CoverGenerationService {
  private openai: OpenAI;
  private config: AIProviderConfig;

  constructor() {
    this.config = {
      apiKey: config.openai.apiKey,
      model: config.openai.model,
      maxAttempts: config.openai.maxAttempts,
    };
    this.openai = new OpenAI({ apiKey: this.config.apiKey });
  }

  async generateCover(request: CoverGenerationRequest): Promise<CoverGenerationResponse> {
    const { prompt, size = '1024x1024', style = 'vivid', quality = 'standard' } = request;

    let lastError: Error | null = null;
    for (let attempt = 1; attempt <= this.config.maxAttempts; attempt++) {
      try {
        const response = await this.openai.images.generate({
          model: this.config.model,
          prompt: this.enhancePrompt(prompt),
          n: 1,
          size,
          style,
          quality,
        });

        if (!response.data || response.data.length === 0) {
          throw new Error('No data returned from OpenAI');
        }

        const imageData = response.data[0];
        if (!imageData || !imageData.url) {
          throw new Error('No image URL returned from OpenAI');
        }

        return {
          url: imageData.url,
          revisedPrompt: imageData.revised_prompt,
          generatedAt: new Date(),
        };
      } catch (error) {
        lastError = error as Error;
        console.error(`Attempt ${attempt} failed:`, error);

        if (attempt < this.config.maxAttempts) {
          // Wait before retrying with exponential backoff
          await this.delay(1000 * attempt);
        }
      }
    }

    throw new Error(
      `Failed to generate cover after ${this.config.maxAttempts} attempts: ${lastError?.message}`
    );
  }

  private enhancePrompt(originalPrompt: string): string {
    // Enhance the prompt to generate better cover images
    const enhancements = [
      'professional book cover design',
      'high quality',
      'visually appealing',
      'modern aesthetic',
    ];

    return `${originalPrompt}, ${enhancements.join(', ')}`;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async validatePrompt(prompt: string): Promise<boolean> {
    // Basic validation
    if (!prompt || prompt.trim().length === 0) {
      throw new Error('Prompt cannot be empty');
    }

    if (prompt.length < 3) {
      throw new Error('Prompt must be at least 3 characters long');
    }

    if (prompt.length > 1000) {
      throw new Error('Prompt must be less than 1000 characters');
    }

    return true;
  }
}
