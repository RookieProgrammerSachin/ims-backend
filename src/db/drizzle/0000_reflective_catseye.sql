CREATE TYPE "public"."inventory_item_usage_type_enum" AS ENUM('lendable', 'rentable');--> statement-breakpoint
CREATE TABLE "inventory_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"disabled" boolean DEFAULT false NOT NULL,
	"created_by" integer NOT NULL,
	"price" varchar(12) NOT NULL,
	"sku" varchar(50),
	"usage_type" "inventory_item_usage_type_enum" DEFAULT 'rentable' NOT NULL,
	"image_url" text,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "inventory_item_sku_unique" UNIQUE("sku")
);
--> statement-breakpoint
CREATE TABLE "admin_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstname" varchar(100),
	"lastname" varchar(100),
	"email" varchar(255),
	"mobile" varchar(20),
	"hash" varchar(255),
	"salt" varchar(255),
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "locations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "inventory_item" ADD CONSTRAINT "inventory_item_created_by_admin_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."admin_users"("id") ON DELETE no action ON UPDATE no action;