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
import { createDesignRequestSchema } from "@/schema/design";
import { useCreateDesign } from "@/hooks/use-design";
import { DialogFooter } from "@/components/ui/dialog";

const formSchema = createDesignRequestSchema;

export function CreateDesignForm({ onSuccess }: { onSuccess: () => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      designTitle: "",
      designBrief: "",
      styleGuidelines: "",
      materialType: "",
      colorPreferences: "",
      sketchUpload: "",
    },
  });

  const createDesignMutation = useCreateDesign();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    createDesignMutation.mutate(values, {
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
          name="designTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Design Title</FormLabel>
              <FormControl>
                <Input placeholder="Sunset" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="designBrief"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Design Brief</FormLabel>
              <FormControl>
                <Textarea placeholder="Brief description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="styleGuidelines"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Style Guidelines</FormLabel>
              <FormControl>
                <Input placeholder="Modern, Minimalist" {...field} />
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
                <Input placeholder="GoreTex, Cotton" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="colorPreferences"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color Preferences</FormLabel>
              <FormControl>
                <Input placeholder="Blue, Green" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sketchUpload"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sketch Upload URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/sketch.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" disabled={createDesignMutation.isPending}>
            {createDesignMutation.isPending ? "Creating..." : "Create Design"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}