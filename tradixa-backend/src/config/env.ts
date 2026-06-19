import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 4000,
  DATABASE_PATH: process.env.DATABASE_PATH || "./data/tradixa-dev.sqlite",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",
};
