import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "./lib/jwt";
import env from "./lib/env";
import { UserTypes } from "./lib/types";

export const cookieNameMap = {
  admin: {
    cookieName: env.ADMIN_COOKIE_NAME!,
    secret: env.ADMIN_COOKIE_SEC!,
  },
  user: {
    cookieName: env.USER_COOKIE_NAME!,
    secret: env.USER_COOKIE_SEC!,
  },
  mgmt: {
    cookieName: env.MGMT_COOKIE_NAME!,
    secret: env.MGMT_COOKIE_SEC!,
  },
};

// Auth middleware
export function authenticate(
  userType: UserTypes,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    // Get token from Authorization header
    const token = String(req.cookies[cookieNameMap[userType].cookieName]);
    if (!token) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    verifyJWT(token, "admin")
      .then(() => {
        const userData = token;
        req.auth = userData;
        next();
      })
      .catch((error) => {
        res.status(401).json({ error: "Invalid token", reason: error.message });
        return;
      });
  } catch (error) {
    res.status(500).json({
      error: "Authentication Server error",
      reason: (error as Error).message,
    });
    return;
  }
}
