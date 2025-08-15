import { z } from "zod";

export const productionProcessSchema = z.object({
  processID: z.string().describe("The Process ID of the Production Process."),
  machineID: z.string().describe("The Machine ID of the Production Process."),
  operatorName: z.string().describe("The Operator Name of the Production Process."),
  startTime: z.string().regex(/^\d{2}:\d{2}$/).describe("The Start Time of the Production Process."),
  batchNo: z.string().describe("The Batch No of the Production Process."),
  initialCount: z.string().describe("The Initial Count of the Production Process."),
  endTime: z.string().regex(/^\d{2}:\d{2}$/).describe("The End Time of the Production Process."),
  totalUnits: z.string().describe("The Total Units of the Production Process."),
  defectsCount: z.string().describe("The Defects Count of the Production Process."),
  qualityReport: z.string().describe("The Quality Report of the Production Process."),
  operatorNote: z.string().describe("The Operator Note of the Production Process."),
});

export const startProductionRequestSchema = z.object({
  machineID: z.string().describe("The Machine ID of the Production Process."),
  operatorName: z.string().describe("The Operator Name of the Production Process."),
  startTime: z.string().regex(/^\d{2}:\d{2}$/).describe("The Start Time of the Production Process."),
  batchNo: z.string().describe("The Batch No of the Production Process."),
  initialCount: z.string().describe("The Initial Count of the Production Process."),
});

export const completeProductionRequestSchema = z.object({
  endTime: z.string().regex(/^\d{2}:\d{2}$/).describe("The End Time of the Production Process."),
  totalUnits: z.string().describe("The Total Units of the Production Process."),
  defectsCount: z.string().describe("The Defects Count of the Production Process."),
  qualityReport: z.string().describe("The Quality Report of the Production Process."),
  operatorNote: z.string().describe("The Operator Note of the Production Process."),
});

export type ProductionProcess = z.infer<typeof productionProcessSchema>;
export type StartProductionRequest = z.infer<typeof startProductionRequestSchema>;
export type CompleteProductionRequest = z.infer<typeof completeProductionRequestSchema>;