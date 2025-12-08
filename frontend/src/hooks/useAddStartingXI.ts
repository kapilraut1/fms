import { createStartingXI } from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
type StartingXIPayload = {
  slots: Record<string, number>; // match backend
};
export function useAddStartingXI() {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, StartingXIPayload>({
    mutationFn: createStartingXI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["startingXI"] });
      toast.success("Starting XI updated successfully!");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const message =
        error.response?.data?.error || error.message || "Something went wrong";
      console.log(message);
      toast.error(message);
    },
  });
}
