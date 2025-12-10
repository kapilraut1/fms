import { addPlayer } from "../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
export function useAddPlayer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
      toast.success("The player is successfully added");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const message =
        error.response?.data?.error || error.message || "Something went wrong";
      toast.error(message);
    },
  });
}
