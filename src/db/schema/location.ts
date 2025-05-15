import { pgTable, serial, varchar, text } from "drizzle-orm/pg-core";
import { timestamps } from "./helper";

export const locations = pgTable("locations", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  ...timestamps,
});

// TODO: create a joining table for products and locations, since one product can be available at multiple locations
