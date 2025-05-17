CREATE TYPE "public"."quantity_change_enum" AS ENUM('subtract', 'add');--> statement-breakpoint
ALTER TABLE "item_qty" ADD COLUMN "operation" "quantity_change_enum" NOT NULL;