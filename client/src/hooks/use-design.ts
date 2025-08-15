import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher, postFetcher } from "@/api/client";
import { DesignSpec, CreateDesignRequest } from "@/schema/design";
import { useToast } from "./use-toast";

export function useDesignSpecs() {
  return useQuery<DesignSpec[]>({
    queryKey: ["designSpecs"],
    queryFn: () => fetcher("/fetch-design-brief"),
  });
}

export function useCreateDesign() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<DesignSpec, Error, CreateDesignRequest>({
    mutationFn: (data) => postFetcher("/create-design", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["designSpecs"] });
      toast({
        title: "Success!",
        description: "Design created successfully.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error!",
        description: `Failed to create design: ${error.message}`,
        variant: "destructive",
      });
    },
  });
}