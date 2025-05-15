import { defineConfig } from "drizzle-kit";
import { DATABASE_URI } from "./src/db/index";

export default defineConfig({
  out: ".src/db/drizzle",
  schema: "./src/db/schema",
  dialect: "postgresql",
  casing: "snake_case",
  dbCredentials: {
    url: DATABASE_URI!,
  },
  strict: true,
  verbose: true,
});
