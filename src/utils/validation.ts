import Joi from 'joi';

export const coverGenerationSchema = Joi.object({
  prompt: Joi.string().min(3).max(1000).required().messages({
    'string.empty': 'Prompt is required',
    'string.min': 'Prompt must be at least 3 characters long',
    'string.max': 'Prompt must be less than 1000 characters',
    'any.required': 'Prompt is required',
  }),
  size: Joi.string().valid('1024x1024', '1024x1792', '1792x1024').optional().messages({
    'any.only': 'Size must be one of: 1024x1024, 1024x1792, 1792x1024',
  }),
  style: Joi.string().valid('vivid', 'natural').optional().messages({
    'any.only': 'Style must be either vivid or natural',
  }),
  quality: Joi.string().valid('standard', 'hd').optional().messages({
    'any.only': 'Quality must be either standard or hd',
  }),
});

export function validateRequest<T>(schema: Joi.ObjectSchema<T>, data: unknown): T {
  const { error, value } = schema.validate(data, { abortEarly: false });

  if (error) {
    const messages = error.details.map((detail) => detail.message).join(', ');
    throw new Error(`Validation error: ${messages}`);
  }

  return value;
}
