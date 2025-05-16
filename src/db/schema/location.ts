import { pgTable, serial, varchar, text, integer } from "drizzle-orm/pg-core";
import { timestamps } from "./helper";
import { inventoryItem } from "./inventory_item";
import { relations } from "drizzle-orm";

export const locations = pgTable("locations", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  ...timestamps,
});

// TODO: create a joining table for products and locations, since one product can be available at multiple locations
export const itemLocations = pgTable("item_locations", {
  itemId: integer()
    .references(() => inventoryItem.id)
    .notNull(),
  locationId: integer()
    .references(() => locations.id)
    .notNull(),
});

export const locationsRelations = relations(locations, ({ many }) => ({
  items: many(itemLocations),
}));

export const itemLocationsRelations = relations(itemLocations, ({ one }) => ({
  item: one(inventoryItem, {
    fields: [itemLocations.itemId],
    references: [inventoryItem.id],
  }),
  location: one(locations, {
    fields: [itemLocations.locationId],
    references: [locations.id],
  }),
}));
