import Database from "better-sqlite3";
import { ENV } from "../config/env";
import path from "path";
import fs from "fs";
import sqlite3 from "sqlite3";
import { open, Database as SqliteDatabase } from "sqlite";

let dbInstance: any = null;
let isUsingFallback = false;

export async function getDbConnection() {
  if (dbInstance) return dbInstance;

  const dbPath = path.resolve(process.cwd(), ENV.DATABASE_PATH as string);
  const dir = path.dirname(dbPath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  try {
    // Try better-sqlite3 first
    const db = new Database(dbPath, { verbose: console.log });
    db.pragma('journal_mode = WAL');
    dbInstance = db;
    console.log("Connected to better-sqlite3");
  } catch (err) {
    console.warn("better-sqlite3 failed or is unavailable, falling back to sqlite3+sqlite.");
    isUsingFallback = true;
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });
    // @ts-ignore
    await db.exec('PRAGMA journal_mode = WAL');
    dbInstance = db;
  }

  return dbInstance;
}

export function isFallback() {
  return isUsingFallback;
}
