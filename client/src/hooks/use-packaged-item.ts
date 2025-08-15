import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher, postFetcher } from "@/api/client";
import { PackagedItem, PackageClothingRequest } from "@/schema/packaged-item";
import { useToast } from "./use-toast";

export function usePackagedItems() {
  return useQuery<PackagedItem[]>({
    queryKey: ["packagedItems"],
    queryFn: () => fetcher("/get-inspection-outcome"),
  });
}

export function usePackageClothing() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<PackagedItem, Error, PackageClothingRequest>({
    mutationFn: (data) => postFetcher("/package-clothing", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packagedItems"] });
      toast({
        title: "Success!",
        description: "Clothing packaged successfully.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error!",
        description: `Failed to package clothing: ${error.message}`,
        variant: "destructive",
      });
    },
  });
}