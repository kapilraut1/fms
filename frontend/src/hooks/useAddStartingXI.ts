import { createStartingXI } from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
type StartingXIPayload = {
  slots: Record<string, number>;
  formation: string;
};
export function useAddStartingXI() {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, StartingXIPayload>({
    mutationFn: createStartingXI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["startingXI"] });
      toast.success("Starting XI updated successfully!");
    },
  });
}
