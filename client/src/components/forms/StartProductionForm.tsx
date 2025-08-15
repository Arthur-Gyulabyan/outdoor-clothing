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
import { startProductionRequestSchema } from "@/schema/production-process";
import { useStartProduction } from "@/hooks/use-production-process";
import { DialogFooter } from "@/components/ui/dialog";

const formSchema = startProductionRequestSchema;

export function StartProductionForm({ onSuccess }: { onSuccess: () => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      machineID: "",
      operatorName: "",
      startTime: "",
      batchNo: "",
      initialCount: "",
    },
  });

  const startProductionMutation = useStartProduction();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startProductionMutation.mutate(values, {
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
          name="machineID"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Machine ID</FormLabel>
              <FormControl>
                <Input placeholder="M001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="operatorName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Operator Name</FormLabel>
              <FormControl>
                <Input placeholder="Alice" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time (HH:MM)</FormLabel>
              <FormControl>
                <Input placeholder="08:00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="batchNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Batch Number</FormLabel>
              <FormControl>
                <Input placeholder="B100" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="initialCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Initial Count</FormLabel>
              <FormControl>
                <Input placeholder="100" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" disabled={startProductionMutation.isPending}>
            {startProductionMutation.isPending ? "Starting..." : "Start Production"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}