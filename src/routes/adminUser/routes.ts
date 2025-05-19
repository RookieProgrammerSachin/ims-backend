import { Router } from "express";
import { createAdmin, getMe, loginAdmin, logoutAdmin } from "./controller";
import { authenticate } from "../../middleware";

const adminUserRouter = Router();

adminUserRouter.post("/", createAdmin);
adminUserRouter.post("/login", loginAdmin);
adminUserRouter.post("/logout", logoutAdmin);
adminUserRouter.get("/me", authenticate("admin"), getMe);

export default adminUserRouter;
