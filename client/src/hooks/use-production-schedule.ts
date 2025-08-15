import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher, postFetcher } from "@/api/client";
import { ProductionSchedule, ScheduleProductionRequest } from "@/schema/production-schedule";
import { useToast } from "./use-toast";

export function useProductionSchedules() {
  return useQuery<ProductionSchedule[]>({
    queryKey: ["productionSchedules"],
    queryFn: () => fetcher("/fetch-production-plan"),
  });
}

export function useScheduleProduction() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<ProductionSchedule, Error, ScheduleProductionRequest>({
    mutationFn: (data) => postFetcher("/schedule-production", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productionSchedules"] });
      toast({
        title: "Success!",
        description: "Production scheduled successfully.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error!",
        description: `Failed to schedule production: ${error.message}`,
        variant: "destructive",
      });
    },
  });
}