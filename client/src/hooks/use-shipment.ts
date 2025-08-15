import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher, postFetcher } from "@/api/client";
import { Shipment, ShipClothingRequest } from "@/schema/shipment";
import { useToast } from "./use-toast";

export function useShipments() {
  return useQuery<Shipment[]>({
    queryKey: ["shipments"],
    queryFn: () => fetcher("/fetch-packaging-status"),
  });
}

export function useShipClothing() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<Shipment, Error, ShipClothingRequest>({
    mutationFn: (data) => postFetcher("/ship-clothing", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipments"] });
      toast({
        title: "Success!",
        description: "Clothing shipped successfully.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error!",
        description: `Failed to ship clothing: ${error.message}`,
        variant: "destructive",
      });
    },
  });
}