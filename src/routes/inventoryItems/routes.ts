import { Router } from "express";
import {
  createInventoryItem,
  fetchAllInventoryCategories,
  fetchAllInventoryItems,
} from "./controller";

const inventoryItemsRouter = Router();

inventoryItemsRouter.get("/items", fetchAllInventoryItems);
inventoryItemsRouter.get("/categories", fetchAllInventoryCategories);
inventoryItemsRouter.post("/items", createInventoryItem);

export default inventoryItemsRouter;
