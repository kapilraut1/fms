import { BackError, Player, PlayerFormValues } from "@/type/Type";
import { addPlayer } from "../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useAddPlayer() {
  const queryClient = useQueryClient();

  return useMutation<Player, BackError, PlayerFormValues>({
    mutationFn: addPlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
      toast.success("The player is successfully added");
    },
  });
}
