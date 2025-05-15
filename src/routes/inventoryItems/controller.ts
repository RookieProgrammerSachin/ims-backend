import { Request, RequestHandler, Response } from "express";
import { db } from "../../db";
import { inventoryItem } from "../../db/schema/inventory_item";
import logger from "../../lib/logger";
import { validateInventoryItem } from "./validation";

export const fetchAllInventoryItems: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const items = await db.query.inventoryItem.findMany();
    res.json(items);
  } catch (error) {
    logger.error("@method fetchAllInventoryItems:", error);
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
    const validation = validateInventoryItem(body);

    if (!validation.success) {
      res.status(400).json({
        error: "Validation failed",
        details: validation.errors,
      });
      return;
    }
    const newItem = await db
      .insert(inventoryItem)
      .values(validation.data!)
      .returning();
    res.status(201).json(newItem[0]);
  } catch (error) {
    logger.error("@method createInventoryItem:", error);
    res.status(500).json({
      error: "Server error in creating inventory item",
    });
  }
};
