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

export const getMe: RequestHandler = async (req: Request, res: Response) => {
  try {
    // Now we can access the authenticated user directly from req.auth
    if (!req.auth) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    // Return the auth data (which already excludes hash and salt)
    res.json({ user: req.auth });
  } catch (error) {
    logger.error("@method getMe:", error);
    res.status(500).json({
      error: "Server error in fetching details",
    });
  }
};
