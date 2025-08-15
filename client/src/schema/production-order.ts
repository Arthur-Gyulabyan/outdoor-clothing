import { z } from "zod";

export const productionOrderSchema = z.object({
  orderNumber: z.string().describe("The Order Number of the Production Order."),
  productDesign: z.string().describe("The Product Design of the Production Order."),
  quantityRequired: z.string().describe("The Quantity Required of the Production Order."),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe("The Due Date of the Production Order."),
  factoryLocation: z.string().describe("The Factory Location of the Production Order."),
});

export const createProductionOrderRequestSchema = z.object({
  orderNumber: z.string().describe("The Order Number of the Production Order."),
  productDesign: z.string().describe("The Product Design of the Production Order."),
  quantityRequired: z.string().describe("The Quantity Required of the Production Order."),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe("The Due Date of the Production Order."),
  factoryLocation: z.string().describe("The Factory Location of the Production Order."),
});

export type ProductionOrder = z.infer<typeof productionOrderSchema>;
export type CreateProductionOrderRequest = z.infer<typeof createProductionOrderRequestSchema>;