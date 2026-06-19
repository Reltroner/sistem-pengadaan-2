import { getDbConnection, isFallback } from "./connection";
import fs from "fs";
import path from "path";

async function migrate() {
  console.log("Starting database migration...");
  try {
    const db = await getDbConnection();
    const schemaPath = path.join(__dirname, "schema.sql");
    const schemaSql = fs.readFileSync(schemaPath, "utf-8");

    if (isFallback()) {
      // sqlite3 fallback
      await db.exec(schemaSql);
    } else {
      // better-sqlite3
      db.exec(schemaSql);
    }
    
    console.log("Migration completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

migrate();
