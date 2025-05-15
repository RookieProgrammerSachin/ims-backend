CREATE TABLE "item_category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"disabled" boolean DEFAULT false NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "item_category_mapping" (
	"id" serial PRIMARY KEY NOT NULL,
	"item_id" integer,
	"category_id" integer,
	CONSTRAINT "item_category_unq" UNIQUE("item_id","category_id")
);
--> statement-breakpoint
ALTER TABLE "item_category_mapping" ADD CONSTRAINT "item_category_mapping_item_id_inventory_item_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."inventory_item"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "item_category_mapping" ADD CONSTRAINT "item_category_mapping_category_id_item_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."item_category"("id") ON DELETE no action ON UPDATE no action;