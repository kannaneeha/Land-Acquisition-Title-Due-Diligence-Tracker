import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import activityRoutes from './routes/activityRoutes.js';
import authRoutes from './routes/authRoutes.js';
import landRoutes from './routes/landRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import userRoutes from './routes/userRoutes.js';
import workflowRoutes from './routes/workflowRoutes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();

const app = express();

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", "https:", "data:"],
    },
  },
}));
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// API routes
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is running' });
});

app.use('/api', authRoutes);
app.use('/api', landRoutes);
app.use('/api', userRoutes);
app.use('/api', activityRoutes);
app.use('/api', reportRoutes);
app.use('/api', workflowRoutes);

// Serve production frontend
const distPath = resolve(__dirname, '..', '..', 'dist');
app.use(express.static(distPath));

// SPA fallback — serve index.html for all non-API routes
app.get('*', (_req, res) => {
  res.sendFile(resolve(distPath, 'index.html'));
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal server error',
  });
});

export default app;
