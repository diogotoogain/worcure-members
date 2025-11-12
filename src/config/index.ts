import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    model: process.env.DEFAULT_MODEL || 'dall-e-3',
    defaultSize: (process.env.DEFAULT_IMAGE_SIZE || '1024x1024') as
      | '1024x1024'
      | '1024x1792'
      | '1792x1024',
    maxAttempts: parseInt(process.env.MAX_GENERATION_ATTEMPTS || '3', 10),
  },
};

export function validateConfig(): void {
  if (!config.openai.apiKey) {
    throw new Error('OPENAI_API_KEY is required in environment variables');
  }
}
