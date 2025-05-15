import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "./helper";
import { relations } from "drizzle-orm";
import { inventoryItem } from "./inventory_item";

export const adminUsers = pgTable("admin_users", {
  id: serial().primaryKey(),
  firstname: varchar({ length: 100 }),
  lastname: varchar({ length: 100 }),
  email: varchar({ length: 255 }),
  mobile: varchar({ length: 20 }),
  hash: varchar({ length: 255 }),
  salt: varchar({ length: 255 }),
  ...timestamps,
});

export const adminUserRelations = relations(adminUsers, ({ many }) => ({
  createdItems: many(inventoryItem),
}));
