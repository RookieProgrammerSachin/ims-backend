import { AuthUser } from "../../src/middleware";

// Extend Express Request to include auth property
declare global {
  declare namespace Express {
    export interface Request {
      auth?: AuthUser;
    }
  }
}
