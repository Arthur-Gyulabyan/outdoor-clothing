import { z } from "zod";

export const productionScheduleSchema = z.object({
  scheduleID: z.string().describe("The Schedule ID of the Production Schedule."),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe("The Start Date of the Production Schedule."),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe("The End Date of the Production Schedule."),
  shiftDetails: z.string().describe("The Shift Details of the Production Schedule."),
  operatorId: z.string().describe("The Operator Id of the Production Schedule."),
  productionLine: z.string().describe("The Production Line of the Production Schedule."),
});

export const scheduleProductionRequestSchema = z.object({
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe("The Start Date of the Production Schedule."),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe("The End Date of the Production Schedule."),
  shiftDetails: z.string().describe("The Shift Details of the Production Schedule."),
  operatorId: z.string().describe("The Operator Id of the Production Schedule."),
  productionLine: z.string().describe("The Production Line of the Production Schedule."),
});

export type ProductionSchedule = z.infer<typeof productionScheduleSchema>;
export type ScheduleProductionRequest = z.infer<typeof scheduleProductionRequestSchema>;