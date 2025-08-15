import { z } from "zod";

export const materialOrderSchema = z.object({
  pONumber: z.string().describe("The PO Number of the Material Order."),
  materialType: z.string().describe("The Material Type of the Material Order."),
  materialGrade: z.string().describe("The Material Grade of the Material Order."),
  quantity: z.string().describe("The Quantity of the Material Order."),
  supplierName: z.string().describe("The Supplier Name of the Material Order."),
  deliveryDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe("The Delivery Date of the Material Order."),
});

export const createMaterialOrderRequestSchema = z.object({
  materialType: z.string().describe("The Material Type of the Material Order."),
  materialGrade: z.string().describe("The Material Grade of the Material Order."),
  quantity: z.string().describe("The Quantity of the Material Order."),
  supplierName: z.string().describe("The Supplier Name of the Material Order."),
  deliveryDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe("The Delivery Date of the Material Order."),
  pONumber: z.string().describe("The PO Number of the Material Order."),
});

export type MaterialOrder = z.infer<typeof materialOrderSchema>;
export type CreateMaterialOrderRequest = z.infer<typeof createMaterialOrderRequestSchema>;