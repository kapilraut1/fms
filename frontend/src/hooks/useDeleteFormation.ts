import { BackError } from "@/type/Type";
import { deleteFormation } from "../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
export function useDeleteFormation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFormation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["formation"] });
      toast.success("The formation is successfully deleted.");
    },
    onError: (error: BackError) => {
      const msg = error.response?.data?.message;
      toast.error(msg);
    },
  });
}
