import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/typeDefs.js';
import { resolvers } from './graphql/resolvers/authResolvers.js';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './mongoDB/config/connection.js';
import { authenticate } from './utils/auth.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file from shared config package
dotenv.config({
  path: path.resolve(__dirname, "../../packages/config/.env"),
});
console.log("ENV:", process.env);

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

async function startServer() {
  try {
    await connectDB();
    console.log("✅ MongoDB Ready");

    // Optional: Database seeding
    // await seedDatabase();
    // console.log("🌱 Database seeding completed");

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      persistedQueries: false,
      context: ({ req }) => {
        const authResult = authenticate({ req });
        return { user: (authResult && typeof authResult !== 'string' ? authResult.user : null) };
      },
    });

    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });

    if (process.env.NODE_ENV === "production") {
      console.log("🌐 Production mode - frontend is hosted separately.");
      await mongoose.connection.dropDatabase();
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (error) {
    console.error("❌ Server startup error:", error);
  }
}

startServer();
