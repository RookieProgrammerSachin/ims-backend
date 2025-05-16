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
import { itemLocations } from "./location";

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

/** Table to track quantity changes across time. However, since locations are also involved, maybe client asks the feature where
 * quantities are tracked across locations and across time.
 * So maybe later modify to include locations too?
 */
export const itemQuantity = pgTable("item_qty", {
  id: serial().primaryKey(),
  itemId: integer()
    .references(() => inventoryItem.id)
    .notNull(),
  quantity: integer().notNull(),
  createdAt: timestamps.createdAt,
});

export const inventoryItemRelations = relations(
  inventoryItem,
  ({ one, many }) => ({
    createdByAdmin: one(adminUsers, {
      fields: [inventoryItem.createdBy],
      references: [adminUsers.id],
    }),
    category: many(itemCategoryMapping),
    locations: many(itemLocations),
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

export const itemQuantityRelations = relations(itemQuantity, ({ one }) => ({
  item: one(inventoryItem, {
    fields: [itemQuantity.itemId],
    references: [inventoryItem.id],
  }),
}));
