import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher, postFetcher } from "@/api/client";
import { ProductionOrder, CreateProductionOrderRequest } from "@/schema/production-order";
import { useToast } from "./use-toast";

export function useProductionOrders() {
  return useQuery<ProductionOrder[]>({
    queryKey: ["productionOrders"],
    queryFn: () => fetcher("/fetch-order-requirements"),
  });
}

export function useCreateProductionOrder() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<ProductionOrder, Error, CreateProductionOrderRequest>({
    mutationFn: (data) => postFetcher("/create-production-order", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productionOrders"] });
      toast({
        title: "Success!",
        description: "Production order created successfully.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error!",
        description: `Failed to create production order: ${error.message}`,
        variant: "destructive",
      });
    },
  });
}