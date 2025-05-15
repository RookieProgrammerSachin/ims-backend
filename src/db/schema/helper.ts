import { timestamp } from "drizzle-orm/pg-core";

export const timestamps = {
  updatedAt: timestamp().$onUpdateFn(() => new Date()),
  createdAt: timestamp().defaultNow().notNull(),
  deletedAt: timestamp(),
};
