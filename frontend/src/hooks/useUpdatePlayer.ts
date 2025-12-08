import { updatePlayer } from "../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlayerFormValues } from "@/type/type";
import { toast } from "react-toastify";
export function useUpdatePlayers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, player }: { id: number; player: PlayerFormValues }) =>
      updatePlayer(id, player),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
      toast.success("The player is edited successfully");
    },
    onError: (err: Error) => {
      console.log("Error is occuring in update context", err);
      toast.error("Error occured while editing");
    },
  });
}
