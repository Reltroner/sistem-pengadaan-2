import { ENV } from "../config/env";
import fs from "fs";
import path from "path";

async function reset() {
  console.log("Starting database reset...");
  const dbPath = path.resolve(process.cwd(), ENV.DATABASE_PATH as string);
  
  try {
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
      console.log(`Deleted database at ${dbPath}`);
    }
    
    // Also remove WAL and SHM files if they exist
    if (fs.existsSync(`${dbPath}-wal`)) fs.unlinkSync(`${dbPath}-wal`);
    if (fs.existsSync(`${dbPath}-shm`)) fs.unlinkSync(`${dbPath}-shm`);

    console.log("Reset complete. Please run migrate and seed.");
    process.exit(0);
  } catch (error) {
    console.error("Reset failed:", error);
    process.exit(1);
  }
}

reset();
