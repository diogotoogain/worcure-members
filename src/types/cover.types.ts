export interface CoverGenerationRequest {
  prompt: string;
  size?: '1024x1024' | '1024x1792' | '1792x1024';
  style?: 'vivid' | 'natural';
  quality?: 'standard' | 'hd';
}

export interface CoverGenerationResponse {
  url: string;
  revisedPrompt?: string;
  generatedAt: Date;
}

export interface CoverGenerationError {
  message: string;
  code: string;
  details?: unknown;
}

export interface AIProviderConfig {
  apiKey: string;
  model: string;
  maxAttempts: number;
}
