import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import "dotenv/config";
import postgres from "postgres";

const DATABASE_URI =
  process.env.DB_MODE === "local"
    ? process.env.DB_URI_LOCAL
    : process.env.DB_URI_PROD;

if (!DATABASE_URI)
  throw new Error(
    "Improper variables configuration. Please contact developer.",
  );

export { DATABASE_URI };

const pgConnection = postgres(DATABASE_URI);

export const db = drizzle(pgConnection, {
  casing: "snake_case",
  schema,
  logger: true,
});
