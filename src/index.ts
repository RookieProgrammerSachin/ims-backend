import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import { config } from "dotenv"
import { DEV_FRONTEND_URI, PROD_FRONTEND_URI } from './lib/constants';
import logger from './lib/logger';
config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: [
    DEV_FRONTEND_URI,
    PROD_FRONTEND_URI
  ]
}))

app.get('/api/hello', (req, res) => {
  res.cookie('myCookie', 'delicious', {
    httpOnly: true,
    sameSite: 'lax'
  });
  res.json({ message: 'Hello from Express with TypeScript!' });
});

app.listen(PORT, () => logger.info('IMS Server running'));