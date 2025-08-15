import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher, postFetcher } from "@/api/client";
import { MaterialOrder, CreateMaterialOrderRequest } from "@/schema/material-order";
import { useToast } from "./use-toast";

export function useMaterialOrders() {
  return useQuery<MaterialOrder[]>({
    queryKey: ["materialOrders"],
    queryFn: () => fetcher("/fetch-inventory-levels"),
  });
}

export function useCreateMaterialOrder() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<MaterialOrder, Error, CreateMaterialOrderRequest>({
    mutationFn: (data) => postFetcher("/create-material-order", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materialOrders"] });
      toast({
        title: "Success!",
        description: "Material order created successfully.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error!",
        description: `Failed to create material order: ${error.message}`,
        variant: "destructive",
      });
    },
  });
}