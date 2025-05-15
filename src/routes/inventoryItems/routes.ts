import { Router } from "express";
import { fetchAllInventoryItems } from "./controller";

const inventoryItemsRouter = Router();

inventoryItemsRouter.get("/items", fetchAllInventoryItems);

export default inventoryItemsRouter;
