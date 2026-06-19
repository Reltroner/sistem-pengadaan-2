import app from "./app";
import { ENV } from "./config/env";
import { getDbConnection } from "./db/connection";

async function startServer() {
  try {
    await getDbConnection();
    app.listen(ENV.PORT, () => {
      console.log(`🚀 Backend server running on http://localhost:${ENV.PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
