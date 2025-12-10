import { updatePlayer } from "../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlayerFormValues } from "@/type/Type";
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const message =
        error.response?.data?.error || error.message || "Something went wrong";
      toast.error(message);
    },
  });
}
