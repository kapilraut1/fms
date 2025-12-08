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
    onError: (err: Error) => {
      console.log("Error is occuring in delete context", err);
      toast.error("The player is not deleted");
    },
  });
}
