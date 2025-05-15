import { Router } from "express";
import { createAdmin } from "./controller";

const adminUserRouter = Router();

adminUserRouter.post("/", createAdmin);

export default adminUserRouter;
