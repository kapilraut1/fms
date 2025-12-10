import { deletePlayer } from "../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
export function useDeletePlayers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["startingXI"] });
      queryClient.invalidateQueries({ queryKey: ["players"] });
      toast.success("The player is successfully deleted.");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const msg = error.response?.data?.message;
      toast.error(msg);
    },
  });
}
