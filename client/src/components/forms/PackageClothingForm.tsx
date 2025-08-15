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
import { packageClothingRequestSchema } from "@/schema/packaged-item";
import { usePackageClothing } from "@/hooks/use-packaged-item";
import { DialogFooter } from "@/components/ui/dialog";

const formSchema = packageClothingRequestSchema;

export function PackageClothingForm({ onSuccess }: { onSuccess: () => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      packageID: "",
      packagingDate: "",
      boxType: "",
      sealStatus: "",
      packagedQty: "",
      comments: "",
    },
  });

  const packageClothingMutation = usePackageClothing();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    packageClothingMutation.mutate(values, {
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
          name="packageID"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Package ID</FormLabel>
              <FormControl>
                <Input placeholder="PKG001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="packagingDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Packaging Date (YYYY-MM-DD)</FormLabel>
              <FormControl>
                <Input placeholder="2023-09-10" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="boxType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Box Type</FormLabel>
              <FormControl>
                <Input placeholder="BoxA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sealStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seal Status</FormLabel>
              <FormControl>
                <Input placeholder="Sealed" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="packagedQty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Packaged Quantity</FormLabel>
              <FormControl>
                <Input placeholder="90" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comments</FormLabel>
              <FormControl>
                <Textarea placeholder="None" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" disabled={packageClothingMutation.isPending}>
            {packageClothingMutation.isPending ? "Packaging..." : "Package Clothing"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}