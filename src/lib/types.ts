import { adminUsers } from "../db/schema";

// Define auth interface matching the admin user schema without hash and salt
export type AuthUser = Omit<typeof adminUsers.$inferSelect, "hash" | "salt">;

export type UserTypes = "admin" | "mgmt" | "user";
