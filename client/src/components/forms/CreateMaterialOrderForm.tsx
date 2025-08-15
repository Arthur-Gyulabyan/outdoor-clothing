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
import { createMaterialOrderRequestSchema } from "@/schema/material-order";
import { useCreateMaterialOrder } from "@/hooks/use-material-order";
import { DialogFooter } from "@/components/ui/dialog";

const formSchema = createMaterialOrderRequestSchema;

export function CreateMaterialOrderForm({ onSuccess }: { onSuccess: () => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pONumber: "",
      materialType: "",
      materialGrade: "",
      quantity: "",
      supplierName: "",
      deliveryDate: "",
    },
  });

  const createMaterialOrderMutation = useCreateMaterialOrder();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    createMaterialOrderMutation.mutate(values, {
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
          name="pONumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PO Number</FormLabel>
              <FormControl>
                <Input placeholder="MO001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="materialType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Material Type</FormLabel>
              <FormControl>
                <Input placeholder="GoreTex" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="materialGrade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Material Grade</FormLabel>
              <FormControl>
                <Input placeholder="A" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input placeholder="500" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="supplierName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Supplier Name</FormLabel>
              <FormControl>
                <Input placeholder="Supplier A" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deliveryDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery Date (YYYY-MM-DD)</FormLabel>
              <FormControl>
                <Input placeholder="2023-10-10" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" disabled={createMaterialOrderMutation.isPending}>
            {createMaterialOrderMutation.isPending ? "Creating..." : "Create Material Order"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}