// lib/db.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

/**
 * Mongoose connection caching for development to avoid recompilation reconnect issues
 * Uses globalThis to store the cached connection.
 */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var _mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
}

let cached = globalThis._mongoose;

if (!cached) {
  cached = globalThis._mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts = {
      // add any mongoose options here
      // useNewUrlParser: true, useUnifiedTopology: true
    };
    cached!.promise = mongoose.connect(MONGODB_URI, opts).then((m) => m);
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}

export default dbConnect;
