import { Router } from "express";
import { createAdmin, getMe } from "./controller";
import { authenticate } from "../../middleware";

const adminUserRouter = Router();

adminUserRouter.post("/", createAdmin);
adminUserRouter.get("/me", authenticate, getMe);

export default adminUserRouter;
