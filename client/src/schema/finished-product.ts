import { z } from "zod";

export const finishedProductSchema = z.object({
  finishedProdID: z.string().describe("The FinishedProd ID of the Finished Product."),
  inspectionDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe("The Inspection Date of the Finished Product."),
  inspector: z.string().describe("The Inspector of the Finished Product."),
  batchNo: z.string().describe("The Batch No of the Finished Product."),
  defectReport: z.string().describe("The Defect Report of the Finished Product."),
  scoreRating: z.string().describe("The Score Rating of the Finished Product."),
});

export const inspectProductRequestSchema = z.object({
  inspectionDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe("The Inspection Date of the Finished Product."),
  inspector: z.string().describe("The Inspector of the Finished Product."),
  batchNo: z.string().describe("The Batch No of the Finished Product."),
  defectReport: z.string().describe("The Defect Report of the Finished Product."),
  scoreRating: z.string().describe("The Score Rating of the Finished Product."),
});

export type FinishedProduct = z.infer<typeof finishedProductSchema>;
export type InspectProductRequest = z.infer<typeof inspectProductRequestSchema>;