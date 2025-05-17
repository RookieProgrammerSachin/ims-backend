import { z } from "zod";
import { inventoryItemUsageTypeEnum } from "../../db/schema/inventory_item";
import { createValidationError } from "../../lib/validation";

export const inventoryItemSchema = z.object({
  name: z.string().min(2, "Name is required and atleast 2 characters"),
  description: z.string().nullish(),
  disabled: z.boolean().default(false),
  createdBy: z.number().positive("Valid creator ID is required"),
  price: z.number().min(1, "Price must be greater than 0"),
  sku: z.string().nullish(),
  usageType: z.enum(inventoryItemUsageTypeEnum.enumValues).default("rentable"),
  imageUrl: z.string().url().nullish(),
  quantity: z
    .number({ required_error: "Item quantity is required" })
    .positive("Quantity cannot be negative"),
  location: z.number().positive("Valid location is required").nullish(),
});

export type InventoryItemInput = z.infer<typeof inventoryItemSchema>;
