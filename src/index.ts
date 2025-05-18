import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import logger from "./lib/logger";
import adminUserRouter from "./routes/adminUser/routes";
import inventoryItemsRouter from "./routes/inventoryItems/routes";
import env from "./lib/env";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: [env.DEV_FRONTEND_URI!, env.PROD_FRONTEND_URI!],
  }),
);

app.use("/admins", adminUserRouter);
app.use("/inventory", inventoryItemsRouter);

app.listen(PORT, () => logger.info("IMS Server running"));
