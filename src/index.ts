import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import { DEV_FRONTEND_URI, PROD_FRONTEND_URI } from "./lib/constants";
import logger from "./lib/logger";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: [DEV_FRONTEND_URI, PROD_FRONTEND_URI],
  }),
);

app.listen(PORT, () => logger.info("IMS Server running"));
