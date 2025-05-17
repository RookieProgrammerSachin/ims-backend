import { Request, RequestHandler, Response } from "express";
import { db } from "../../db";
import { itemLocations } from "../../db/schema";
import { inventoryItem, itemQuantity } from "../../db/schema/inventory_item";
import logger from "../../lib/logger";
import { createValidationError } from "../../lib/validation";
import { inventoryItemSchema } from "./validation";

export const fetchAllInventoryItems: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const items = await db.query.inventoryItem.findMany({
      with: {
        categories: {
          columns: {
            categoryId: true,
          },
          with: {
            category: {
              columns: {
                name: true,
                id: true,
              },
            },
          },
        },
        locations: {
          with: {
            location: {
              columns: {
                name: true,
                id: true,
              },
            },
          },
        },
        quantity: {
          columns: {
            finalQuantity: true,
          },
          limit: 1,
          orderBy(fields, operators) {
            return operators.desc(fields.createdAt);
          },
        },
      },
    });
    res.json({ data: items });
  } catch (error) {
    logger.error("@method fetchAllInventoryItems:", error);
    res.status(500).json({
      error: "Server error in fetching inventory items",
    });
  }
};

export const fetchAllInventoryCategories: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const categories = await db.query.inventoryItemCategory.findMany();
    res.json({ data: categories });
  } catch (error) {
    logger.error("@method fetchAllInventoryCategories:", error);
    res.status(500).json({
      error: "Server error in fetching inventory items",
    });
  }
};

export const fetchAllLocations: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const locations = await db.query.locations.findMany();
    res.json({ data: locations });
  } catch (error) {
    logger.error("@method fetchAllLocations:", error);
    res.status(500).json({
      error: "Server error in fetching inventory items",
    });
  }
};

export const createInventoryItem: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const { body } = req;
    const validation = inventoryItemSchema.safeParse(body);

    if (!validation.success) {
      res.status(400).json({
        errors: createValidationError(validation),
      });
      return;
    }

    await db.transaction(async (tx) => {
      const [item] = await tx
        .insert(inventoryItem)
        .values({
          createdBy: validation.data.createdBy,
          name: validation.data.name,
          price: String(validation.data.price),
          description: validation.data.description,
          disabled: validation.data.disabled,
          imageUrl: validation.data.imageUrl,
          sku: validation.data.sku,
          usageType: validation.data.usageType,
        })
        .returning();

      await tx
        .insert(itemLocations)
        .values({ itemId: item.id, locationId: validation.data.location });

      await tx.insert(itemQuantity).values({
        itemId: item.id,
        finalQuantity: validation.data.quantity,
        quantity: validation.data.quantity,
        operation: "add",
        reason: "Admin add new item",
      });
    });

    res.status(201).json({ message: "Item created successfully!" });
  } catch (error) {
    logger.error("@method createInventoryItem:", error);
    res.status(500).json({
      error: "Server error in creating inventory item",
    });
  }
};
