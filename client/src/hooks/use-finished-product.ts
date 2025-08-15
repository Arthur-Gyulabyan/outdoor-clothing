import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher, postFetcher } from "@/api/client";
import { FinishedProduct, InspectProductRequest } from "@/schema/finished-product";
import { useToast } from "./use-toast";

export function useFinishedProducts() {
  return useQuery<FinishedProduct[]>({
    queryKey: ["finishedProducts"],
    queryFn: () => fetcher("/fetch-production-quality"),
  });
}

export function useInspectProduct() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<FinishedProduct, Error, InspectProductRequest>({
    mutationFn: (data) => postFetcher("/inspect-product", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["finishedProducts"] });
      toast({
        title: "Success!",
        description: "Product inspected successfully.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error!",
        description: `Failed to inspect product: ${error.message}`,
        variant: "destructive",
      });
    },
  });
}