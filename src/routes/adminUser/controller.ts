import { Request, RequestHandler, Response } from "express";
import logger from "../../lib/logger";

export const createAdmin: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    res.json({ message: "OK" });
  } catch (error) {
    logger.error("@method createAdmin:", error);
    res.status(500).json({
      error: "Server error in creating admin",
    });
  }
};
