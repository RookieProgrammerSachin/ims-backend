import { Request, RequestHandler, Response } from "express";
import logger from "../../lib/logger";

export const fetchAllInventoryItems: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    res.json([]);
  } catch (error) {
    logger.error("@method fetchAllInventoryItems:", error);
    res.status(500).json({
      error: "Server error in fetching inventory items",
    });
  }
};
