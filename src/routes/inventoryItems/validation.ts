import { z } from "zod";
import { inventoryItemUsageTypeEnum } from "../../db/schema/inventory_item";
import { createValidationError } from "../../lib/validation";

export const inventoryItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().nullish(),
  disabled: z.boolean().default(false),
  createdBy: z.number().positive("Valid creator ID is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((value) => !isNaN(Number(value)), "Price's format is invalid!"),
  sku: z.string().nullish(),
  usageType: z.enum(inventoryItemUsageTypeEnum.enumValues).default("rentable"),
  imageUrl: z.string().url().nullish(),
});

export type InventoryItemInput = z.infer<typeof inventoryItemSchema>;

export const validateInventoryItem = (data: unknown) => {
  const result = inventoryItemSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: createValidationError(result),
    };
  }

  return {
    success: true,
    data: result.data,
  };
};
