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
import { createProductionOrderRequestSchema } from "@/schema/production-order";
import { useCreateProductionOrder } from "@/hooks/use-production-order";
import { DialogFooter } from "@/components/ui/dialog";

const formSchema = createProductionOrderRequestSchema;

export function CreateProductionOrderForm({ onSuccess }: { onSuccess: () => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderNumber: "",
      productDesign: "",
      quantityRequired: "",
      dueDate: "",
      factoryLocation: "",
    },
  });

  const createProductionOrderMutation = useCreateProductionOrder();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    createProductionOrderMutation.mutate(values, {
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
          name="orderNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order Number</FormLabel>
              <FormControl>
                <Input placeholder="PO001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productDesign"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Design</FormLabel>
              <FormControl>
                <Input placeholder="Design1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantityRequired"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity Required</FormLabel>
              <FormControl>
                <Input placeholder="100" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Date (YYYY-MM-DD)</FormLabel>
              <FormControl>
                <Input placeholder="2023-11-01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="factoryLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Factory Location</FormLabel>
              <FormControl>
                <Input placeholder="FactoryA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" disabled={createProductionOrderMutation.isPending}>
            {createProductionOrderMutation.isPending ? "Creating..." : "Create Production Order"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}