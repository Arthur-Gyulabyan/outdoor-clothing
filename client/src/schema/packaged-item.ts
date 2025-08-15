import { z } from "zod";

export const packagedItemSchema = z.object({
  packageID: z.string().describe("The Package ID of the Packaged Item."),
  packagingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe("The Packaging Date of the Packaged Item."),
  boxType: z.string().describe("The Box Type of the Packaged Item."),
  sealStatus: z.string().describe("The Seal Status of the Packaged Item."),
  packagedQty: z.string().describe("The Packaged Qty of the Packaged Item."),
  comments: z.string().describe("The Comments of the Packaged Item."),
});

export const packageClothingRequestSchema = z.object({
  packageID: z.string().describe("The Package ID of the Packaged Item."),
  packagingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe("The Packaging Date of the Packaged Item."),
  boxType: z.string().describe("The Box Type of the Packaged Item."),
  sealStatus: z.string().describe("The Seal Status of the Packaged Item."),
  packagedQty: z.string().describe("The Packaged Qty of the Packaged Item."),
  comments: z.string().describe("The Comments of the Packaged Item."),
});

export type PackagedItem = z.infer<typeof packagedItemSchema>;
export type PackageClothingRequest = z.infer<typeof packageClothingRequestSchema>;