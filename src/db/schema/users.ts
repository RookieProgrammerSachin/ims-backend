import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "./helper";
import { relations } from "drizzle-orm";
import { inventoryItem } from "./inventory_item";

export const adminUsers = pgTable("admin_users", {
  id: serial().primaryKey(),
  firstname: varchar({ length: 100 }).notNull(),
  lastname: varchar({ length: 100 }),
  email: varchar({ length: 255 }).notNull().unique(),
  mobile: varchar({ length: 10 }).notNull().unique(),
  hash: varchar().notNull(),
  salt: varchar().notNull(),
  ...timestamps,
});

export const adminUserRelations = relations(adminUsers, ({ many }) => ({
  createdItems: many(inventoryItem),
}));
