import { z } from "zod";

export const designSpecSchema = z.object({
  designSpecID: z.string().describe("The Design Spec ID of the Design Spec."),
  designTitle: z.string().describe("The Design Title of the Design Spec."),
  designBrief: z.string().describe("The Design Brief of the Design Spec."),
  styleGuidelines: z.string().describe("The Style Guidelines of the Design Spec."),
  materialType: z.string().describe("The Material Type of the Design Spec."),
  colorPreferences: z.string().describe("The Color Preferences of the Design Spec."),
  sketchUpload: z.string().describe("The Sketch Upload of the Design Spec."),
});

export const createDesignRequestSchema = z.object({
  designTitle: z.string().describe("The Design Title of the Design Spec."),
  designBrief: z.string().describe("The Design Brief of the Design Spec."),
  styleGuidelines: z.string().describe("The Style Guidelines of the Design Spec."),
  materialType: z.string().describe("The Material Type of the Design Spec."),
  colorPreferences: z.string().describe("The Color Preferences of the Design Spec."),
  sketchUpload: z.string().describe("The Sketch Upload of the Design Spec."),
});

export type DesignSpec = z.infer<typeof designSpecSchema>;
export type CreateDesignRequest = z.infer<typeof createDesignRequestSchema>;