CREATE TABLE "item_qty" (
	"id" serial PRIMARY KEY NOT NULL,
	"item_id" integer NOT NULL,
	"quantity" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "item_locations" (
	"item_id" integer NOT NULL,
	"location_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "item_qty" ADD CONSTRAINT "item_qty_item_id_inventory_item_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."inventory_item"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "item_locations" ADD CONSTRAINT "item_locations_item_id_inventory_item_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."inventory_item"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "item_locations" ADD CONSTRAINT "item_locations_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE no action ON UPDATE no action;