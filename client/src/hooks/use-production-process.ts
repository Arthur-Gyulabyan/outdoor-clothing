import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher, postFetcher } from "@/api/client";
import { ProductionProcess, StartProductionRequest, CompleteProductionRequest } from "@/schema/production-process";
import { useToast } from "./use-toast";

export function useProductionProcesses() {
  return useQuery<ProductionProcess[]>({
    queryKey: ["productionProcesses"],
    queryFn: () => fetcher("/get-work-status"), // Using get-work-status as it seems more general for ongoing processes
  });
}

export function useStartProduction() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<ProductionProcess, Error, StartProductionRequest>({
    mutationFn: (data) => postFetcher("/start-production", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productionProcesses"] });
      toast({
        title: "Success!",
        description: "Production started successfully.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error!",
        description: `Failed to start production: ${error.message}`,
        variant: "destructive",
      });
    },
  });
}

export function useCompleteProduction() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<ProductionProcess, Error, CompleteProductionRequest>({
    mutationFn: (data) => postFetcher("/complete-production", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productionProcesses"] });
      toast({
        title: "Success!",
        description: "Production completed successfully.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error!",
        description: `Failed to complete production: ${error.message}`,
        variant: "destructive",
      });
    },
  });
}