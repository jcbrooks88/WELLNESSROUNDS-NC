import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Convert ES module URL to file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({
  path: path.resolve(__dirname, "../../../../packages/config/.env"),
});

const env = process.env.NODE_ENV || "development";
console.log(`🌱 Running in ${env} mode`);

// Get MongoDB URI from environment
let MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  if (env === "development") {
    console.warn("⚠️ MONGODB_URI not found in .env file. Using fallback local database.");
    MONGODB_URI = "mongodb://localhost:27017/mentalhealth_forum";
  } else {
    throw new Error("❌ MongoDB connection string is missing in environment variables.");
  }
}

// Optional: enable Mongoose debug logging in development
if (env === "development") {
  mongoose.set("debug", true);
}

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("⚡ Using existing MongoDB connection");
    return mongoose.connection;
  }

  try {
    await mongoose.connect(MONGODB_URI as string);
    isConnected = true;
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Exit on failure
  }
};

export default connectDB;
