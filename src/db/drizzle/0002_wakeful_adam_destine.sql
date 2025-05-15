ALTER TABLE "admin_users" ALTER COLUMN "mobile" SET DATA TYPE varchar(10);--> statement-breakpoint
ALTER TABLE "admin_users" ALTER COLUMN "hash" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "admin_users" ALTER COLUMN "salt" SET DATA TYPE varchar;