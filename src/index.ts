import express, { Application } from 'express';
import { config, validateConfig } from './config/index.js';
import coverRoutes from './routes/covers.routes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

// Validate configuration before starting
try {
  validateConfig();
} catch (error) {
  console.error('Configuration error:', error);
  process.exit(1);
}

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (_req, res) => {
  res.json({
    message: 'Worcure Members - AI Cover Generation Service',
    version: '1.0.0',
    endpoints: {
      generateCover: 'POST /api/covers/generate',
      health: 'GET /api/covers/health',
    },
  });
});

app.use('/api/covers', coverRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${config.nodeEnv}`);
  console.log(`🤖 AI Model: ${config.openai.model}`);
});

export default app;
