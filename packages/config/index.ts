// packages/config/index.ts
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Dynamically find the .env file path (in same dir as this file)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, ".env") });

export const config = {
  mongoURI: process.env.MONGODB_URI || "",
  jwtSecret: process.env.JWT_SECRET || "",
  nodeEnv: process.env.NODE_ENV || "development",
};
