import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { ENV } from "./config/env";
import { procurementRouter } from "./modules/procurement/procurement.routes";
import { errorResponse, successResponse } from "./shared/http";
import { AppError } from "./shared/errors";

const app = express();

app.use(cors({ origin: ENV.CORS_ORIGIN }));
app.use(express.json());

// Health Check
app.get("/api/health", (req: Request, res: Response) => {
  res.json(successResponse({ status: "ok", timestamp: new Date().toISOString() }));
});

// Mount routes
app.use("/api", procurementRouter);

// 404
app.use((req: Request, res: Response) => {
  res.status(404).json(errorResponse("NOT_FOUND", "Route not found"));
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled Error:", err);
  if (err instanceof AppError) {
    res.status(err.statusCode).json(errorResponse(err.code, err.message));
  } else {
    res.status(500).json(errorResponse("INTERNAL_ERROR", "An unexpected error occurred"));
  }
});

export default app;
