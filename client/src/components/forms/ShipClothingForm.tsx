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
import { shipClothingRequestSchema } from "@/schema/shipment";
import { useShipClothing } from "@/hooks/use-shipment";
import { DialogFooter } from "@/components/ui/dialog";

const formSchema = shipClothingRequestSchema;

export function ShipClothingForm({ onSuccess }: { onSuccess: () => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shipmentNo: "",
      shipDate: "",
      trackingNo: "",
      destAddress: "",
      shippingMode: "",
      carrierName: "",
    },
  });

  const shipClothingMutation = useShipClothing();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    shipClothingMutation.mutate(values, {
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
          name="shipmentNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shipment Number</FormLabel>
              <FormControl>
                <Input placeholder="SHP001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shipDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ship Date (YYYY-MM-DD)</FormLabel>
              <FormControl>
                <Input placeholder="2023-09-15" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="trackingNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tracking Number</FormLabel>
              <FormControl>
                <Input placeholder="TRK001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="destAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destination Address</FormLabel>
              <FormControl>
                <Input placeholder="Address A" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shippingMode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shipping Mode</FormLabel>
              <FormControl>
                <Input placeholder="Air" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="carrierName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Carrier Name</FormLabel>
              <FormControl>
                <Input placeholder="CarrierA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" disabled={shipClothingMutation.isPending}>
            {shipClothingMutation.isPending ? "Shipping..." : "Ship Clothing"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}