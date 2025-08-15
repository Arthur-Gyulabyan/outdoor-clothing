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
import { Textarea } from "@/components/ui/textarea";
import { completeProductionRequestSchema } from "@/schema/production-process";
import { useCompleteProduction } from "@/hooks/use-production-process";
import { DialogFooter } from "@/components/ui/dialog";

const formSchema = completeProductionRequestSchema;

export function CompleteProductionForm({ onSuccess }: { onSuccess: () => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      endTime: "",
      totalUnits: "",
      defectsCount: "",
      qualityReport: "",
      operatorNote: "",
    },
  });

  const completeProductionMutation = useCompleteProduction();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    completeProductionMutation.mutate(values, {
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
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Time (HH:MM)</FormLabel>
              <FormControl>
                <Input placeholder="12:00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="totalUnits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Units</FormLabel>
              <FormControl>
                <Input placeholder="110" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="defectsCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Defects Count</FormLabel>
              <FormControl>
                <Input placeholder="2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="qualityReport"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quality Report</FormLabel>
              <FormControl>
                <Input placeholder="Pass" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="operatorNote"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Operator Note</FormLabel>
              <FormControl>
                <Textarea placeholder="Good work" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" disabled={completeProductionMutation.isPending}>
            {completeProductionMutation.isPending ? "Completing..." : "Complete Production"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}