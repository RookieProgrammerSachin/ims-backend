import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  unique,
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

export const inventoryItemCategory = pgTable("item_category", {
  id: serial().primaryKey(),
  name: text().notNull(),
  disabled: boolean().default(false).notNull(),
  ...timestamps,
});

export const itemCategoryMapping = pgTable(
  "item_category_mapping",
  {
    id: serial().primaryKey(),
    itemId: integer().references(() => inventoryItem.id),
    categoryId: integer().references(() => inventoryItemCategory.id),
  },
  (t) => [unique("item_category_unq").on(t.itemId, t.categoryId)],
);

export const inventoryItemRelations = relations(
  inventoryItem,
  ({ one, many }) => ({
    createdByAdmin: one(adminUsers, {
      fields: [inventoryItem.createdBy],
      references: [adminUsers.id],
    }),
    category: many(itemCategoryMapping),
  }),
);

export const inventoryItemCategoryRelations = relations(
  inventoryItemCategory,
  ({ many }) => ({
    mapping: many(itemCategoryMapping),
  }),
);

export const itemCategoryMappingRelations = relations(
  itemCategoryMapping,
  ({ one }) => ({
    category: one(inventoryItemCategory, {
      fields: [itemCategoryMapping.categoryId],
      references: [inventoryItemCategory.id],
    }),
    item: one(inventoryItem, {
      fields: [itemCategoryMapping.itemId],
      references: [inventoryItem.id],
    }),
  }),
);
