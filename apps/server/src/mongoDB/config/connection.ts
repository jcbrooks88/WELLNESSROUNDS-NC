import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { loadEnvConfig } from '../../utils/configLoader.js'; // centralized env loader
import { logger } from '../../utils/logger.js';

// Convert ES module URL to file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../../packages/config/.env"),
});

// Load environment variables from .env
loadEnvConfig();

const env = process.env.NODE_ENV || 'development';
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  if (env === 'development') {
    logger.warn('⚠️ MONGODB_URI not found in .env file. Using fallback local database.');
  } else {
    logger.error('❌ MONGODB_URI is required in production environment.');
    process.exit(1);
  }
}

if (env === 'development') {
  mongoose.set('debug', true);
}

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    logger.info('⚡ Using existing MongoDB connection');
    return mongoose.connection;
  }

  try {
    const uri = MONGODB_URI || 'mongodb://localhost:27017/mentalhealth_forum';
    await mongoose.connect(uri);
    isConnected = true;
    logger.success('✅ MongoDB Connected');
    return mongoose.connection;
  } catch (error) {
    logger.error('❌ MongoDB connection error:');
    console.error(error); // Show full error trace
    process.exit(1);
  }
};

export default connectDB;
