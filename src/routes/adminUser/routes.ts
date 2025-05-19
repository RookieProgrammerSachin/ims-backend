import { Router } from "express";
import { createAdmin, getMe, loginAdmin } from "./controller";
import { authenticate } from "../../middleware";

const adminUserRouter = Router();

adminUserRouter.post("/", createAdmin);
adminUserRouter.post("/login", loginAdmin);
adminUserRouter.get("/me", authenticate("admin"), getMe);

export default adminUserRouter;
