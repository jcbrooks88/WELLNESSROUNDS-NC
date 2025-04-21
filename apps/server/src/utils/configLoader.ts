import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from './logger.js';

// ES module __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function loadEnvConfig() {
  const envPath = path.resolve(__dirname, '../../../packages/config/.env');
  dotenv.config({ path: envPath });

  logger.info('Environment variables loaded');
  logger.info(`Environment: ${process.env.NODE_ENV}`);
  logger.info(`Frontend Origin: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  logger.info(`Mongo URI: ${process.env.MONGODB_URI ? '✔️ Loaded' : '❌ Missing'}`);
}
