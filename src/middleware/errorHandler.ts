import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  console.error('Error:', err);

  // Default error response
  let statusCode = 500;
  let message = 'Internal server error';
  let details = undefined;

  // Handle validation errors
  if (err.message.startsWith('Validation error:')) {
    statusCode = 400;
    message = err.message;
  }
  // Handle OpenAI API errors
  else if (err.message.includes('OpenAI')) {
    statusCode = 502;
    message = 'AI service error';
    details = err.message;
  }
  // Handle configuration errors
  else if (err.message.includes('OPENAI_API_KEY')) {
    statusCode = 500;
    message = 'Server configuration error';
  }
  // Generic errors
  else {
    message = err.message || message;
  }

  res.status(statusCode).json({
    error: {
      message,
      code: statusCode,
      details,
    },
  });
}

export function notFoundHandler(_req: Request, res: Response) {
  res.status(404).json({
    error: {
      message: 'Endpoint not found',
      code: 404,
    },
  });
}
