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
import { inspectProductRequestSchema } from "@/schema/finished-product";
import { useInspectProduct } from "@/hooks/use-finished-product";
import { DialogFooter } from "@/components/ui/dialog";

const formSchema = inspectProductRequestSchema;

export function InspectProductForm({ onSuccess }: { onSuccess: () => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inspectionDate: "",
      inspector: "",
      batchNo: "",
      defectReport: "",
      scoreRating: "",
    },
  });

  const inspectProductMutation = useInspectProduct();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    inspectProductMutation.mutate(values, {
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
          name="inspectionDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Inspection Date (YYYY-MM-DD)</FormLabel>
              <FormControl>
                <Input placeholder="2023-09-06" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="inspector"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Inspector</FormLabel>
              <FormControl>
                <Input placeholder="Inspector A" {...field} />
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
              <FormLabel>Batch No</FormLabel>
              <FormControl>
                <Input placeholder="B100" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="defectReport"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Defect Report</FormLabel>
              <FormControl>
                <Textarea placeholder="None" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="scoreRating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Score Rating</FormLabel>
              <FormControl>
                <Input placeholder="95" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" disabled={inspectProductMutation.isPending}>
            {inspectProductMutation.isPending ? "Inspecting..." : "Inspect Product"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}