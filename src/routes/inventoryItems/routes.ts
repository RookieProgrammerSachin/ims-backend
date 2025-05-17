import { Router } from "express";
import {
  createInventoryItem,
  fetchAllInventoryCategories,
  fetchAllInventoryItems,
  fetchAllLocations,
} from "./controller";

const inventoryItemsRouter = Router();

inventoryItemsRouter.get("/items", fetchAllInventoryItems);
inventoryItemsRouter.get("/categories", fetchAllInventoryCategories);
inventoryItemsRouter.get("/locations", fetchAllLocations);
inventoryItemsRouter.post("/items", createInventoryItem);

export default inventoryItemsRouter;
