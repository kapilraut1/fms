import { updatePlayer } from "../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BackError, PlayerFormValues, Playerid } from "@/type/Type";
import { toast } from "react-toastify";
export function useUpdatePlayers() {
  const queryClient = useQueryClient();

  return useMutation<
    Playerid,
    BackError,
    { id: number; player: PlayerFormValues }
  >({
    mutationFn: ({ id, player }) => updatePlayer(id, player),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
      toast.success("The player is edited successfully");
    },
  });
}
