import { Router } from "express";
import { createInventoryItem, fetchAllInventoryItems } from "./controller";

const inventoryItemsRouter = Router();

inventoryItemsRouter.get("/items", fetchAllInventoryItems);
inventoryItemsRouter.post("/items", createInventoryItem);

export default inventoryItemsRouter;
