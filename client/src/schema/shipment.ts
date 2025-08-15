import { z } from "zod";

export const shipmentSchema = z.object({
  shipmentNo: z.string().describe("The Shipment No of the Shipment."),
  shipDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe("The Ship Date of the Shipment."),
  trackingNo: z.string().describe("The Tracking No of the Shipment."),
  destAddress: z.string().describe("The Dest Address of the Shipment."),
  shippingMode: z.string().describe("The Shipping Mode of the Shipment."),
  carrierName: z.string().describe("The Carrier Name of the Shipment."),
});

export const shipClothingRequestSchema = z.object({
  shipmentNo: z.string().describe("The Shipment No of the Shipment."),
  shipDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe("The Ship Date of the Shipment."),
  trackingNo: z.string().describe("The Tracking No of the Shipment."),
  destAddress: z.string().describe("The Dest Address of the Shipment."),
  shippingMode: z.string().describe("The Shipping Mode of the Shipment."),
  carrierName: z.string().describe("The Carrier Name of the Shipment."),
});

export type Shipment = z.infer<typeof shipmentSchema>;
export type ShipClothingRequest = z.infer<typeof shipClothingRequestSchema>;