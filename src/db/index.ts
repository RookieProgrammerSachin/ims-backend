import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import "dotenv/config";

const DATABASE_URI =
  process.env.DB_MODE === "local"
    ? process.env.DB_URI_LOCAL
    : process.env.DB_URI_PROD;

if (!DATABASE_URI)
  throw new Error(
    "Improper variables configuration. Please contact developer.",
  );

export { DATABASE_URI };

export const db = drizzle(DATABASE_URI, {
  casing: "snake_case",
  schema,
  logger: true,
});
