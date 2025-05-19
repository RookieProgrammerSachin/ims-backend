import { Request, RequestHandler, Response } from "express";
import logger from "../../lib/logger";
import { adminSignUpSchema } from "./validation";
import { createValidationError } from "../../lib/validation";
import { verifyPassword } from "../../lib/password";
import { db } from "../../db";
import { signJWT } from "../../lib/jwt";
import env from "../../lib/env";

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

export const loginAdmin: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const adminLoginValidation = adminSignUpSchema.safeParse(req.body);
    if (adminLoginValidation.error) {
      res.status(400).json({
        errors: createValidationError(adminLoginValidation),
      });
      return;
    }
    const user = await db.query.adminUsers.findFirst({
      where(fields, operators) {
        return operators.eq(fields.email, adminLoginValidation.data.email);
      },
    });
    if (!user) {
      res.status(404).json({
        error: "User not found!",
      });
      return;
    }
    const isPasswordVerified = await verifyPassword(
      { hash: user.hash, salt: user.salt },
      adminLoginValidation.data.password,
    );
    if (!isPasswordVerified) {
      res.status(403).json({
        error: "Invalid credentials!",
      });
      return;
    }
    const userAuth = {
      ...user,
      hash: undefined,
      salt: undefined,
    };
    const token = await signJWT(userAuth, env.ADMIN_COOKIE_SEC!);
    const cookieExpiryTime = new Date(
      new Date().getTime() + 6 * 60 * 60 * 1000,
    );
    res.cookie(env.ADMIN_COOKIE_NAME!, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: cookieExpiryTime,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    res.json({
      data: userAuth,
    });
  } catch (error) {
    logger.error("@method loginAdmin:", error);
    res.status(500).json({
      error: "Server error in logging in",
    });
  }
};

export const logoutAdmin: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    res.clearCookie(env.ADMIN_COOKIE_NAME!, {
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    logger.error("@method logoutAdmin:", error);
    res.status(500).json({
      error: "Server error in logging out",
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
    res.json({ data: req.auth });
  } catch (error) {
    logger.error("@method getMe:", error);
    res.status(500).json({
      error: "Server error in fetching details",
    });
  }
};
