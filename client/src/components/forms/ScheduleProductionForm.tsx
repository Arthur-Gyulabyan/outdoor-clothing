import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { scheduleProductionRequestSchema } from "@/schema/production-schedule";
import { useScheduleProduction } from "@/hooks/use-production-schedule";
import { DialogFooter } from "@/components/ui/dialog";

const formSchema = scheduleProductionRequestSchema;

export function ScheduleProductionForm({ onSuccess }: { onSuccess: () => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: "",
      endDate: "",
      shiftDetails: "",
      operatorId: "",
      productionLine: "",
    },
  });

  const scheduleProductionMutation = useScheduleProduction();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    scheduleProductionMutation.mutate(values, {
      onSuccess: () => {
        onSuccess();
        form.reset();
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date (YYYY-MM-DD)</FormLabel>
              <FormControl>
                <Input placeholder="2023-09-01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date (YYYY-MM-DD)</FormLabel>
              <FormControl>
                <Input placeholder="2023-09-05" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shiftDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shift Details</FormLabel>
              <FormControl>
                <Input placeholder="Morning" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="operatorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Operator ID</FormLabel>
              <FormControl>
                <Input placeholder="OPR001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productionLine"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Production Line</FormLabel>
              <FormControl>
                <Input placeholder="Line A" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" disabled={scheduleProductionMutation.isPending}>
            {scheduleProductionMutation.isPending ? "Scheduling..." : "Schedule Production"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}