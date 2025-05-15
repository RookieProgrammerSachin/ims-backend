import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";
import { timestamps } from "./helper";
import { adminUsers } from "./users";
import { relations } from "drizzle-orm";

export const inventoryItemUsageTypeEnum = pgEnum(
  "inventory_item_usage_type_enum",
  ["lendable", "rentable"],
);

export const inventoryItem = pgTable("inventory_item", {
  id: serial().primaryKey(),
  name: text().notNull(),
  description: text(),
  disabled: boolean().default(false).notNull(),
  createdBy: integer()
    .references(() => adminUsers.id)
    .notNull(),
  price: varchar({ length: 12 }).notNull(),
  sku: varchar({ length: 50 }).unique(),
  usageType: inventoryItemUsageTypeEnum().default("rentable").notNull(),
  imageUrl: text(),
  ...timestamps,
});

export const inventoryItemRelations = relations(inventoryItem, ({ one }) => ({
  createdByAdmin: one(adminUsers, {
    fields: [inventoryItem.createdBy],
    references: [adminUsers.id],
  }),
}));
