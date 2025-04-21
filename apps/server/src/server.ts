import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { seedDatabase } from "./seeds/seedDatabase.js";
import connectDB from './mongoDB/config/connection.js';
import { typeDefs } from './graphql/schemas/index.js';
import { resolvers } from './graphql/resolvers/index.js';
import mongoose from 'mongoose';
import { authenticate } from './utils/auth.js';
import { loadEnvConfig } from './utils/configLoader.js';
import { logger } from './utils/logger.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// ESM __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../../packages/config/.env"),
});

// Load env vars
loadEnvConfig();

const app = express();
const PORT = process.env.PORT || 4000;

// CORS setup
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// Health check route
app.get('/status', (_req, res) => {
  res.json({ message: '🟢 Server is healthy', uptime: process.uptime() });
});

async function startServer() {
  try {
    await connectDB();
    logger.success('MongoDB Ready');

    await seedDatabase();
    console.log("🌱 Database seeding completed");

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      persistedQueries: false,
      context: ({ req }) => {
        const user = authenticate(req);
        if (!user) {
          console.warn('No user found in request auth header');
        } else {
          console.log('Authenticated user:', user);
        }
        return { user };
      },
    });
      

    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    if (process.env.NODE_ENV === 'production') {
      logger.warn('Production mode detected.');
      // ⚠️ Comment this in real deployment
      // await mongoose.connection.dropDatabase();
      // logger.warn('⚠️ Database was dropped in production.');
    }

    app.listen(PORT, () => {
      logger.startup(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.disconnect();
      logger.info('MongoDB disconnected on app termination');
      process.exit(0);
    });

  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Server startup failed: ${error.message}`);
    } else {
      logger.error('Server startup failed with an unknown error');
    }
  }
}

startServer();
