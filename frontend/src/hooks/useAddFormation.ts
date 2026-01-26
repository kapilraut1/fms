import { createFormation } from "../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Formationobj } from "@/type/Type";
import { toast } from "react-toastify";
import { BackError } from "@/type/Type";
export function useAddFormation() {
  const queryClient = useQueryClient();

  return useMutation<Formationobj, AxiosError<{ message: string }>, string>({
    mutationFn: createFormation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["formation"] });
      toast.success("The formation is added ");
    },
    onError: (error: BackError) => {
      let message = "Something went wrong";
      if (error instanceof AxiosError) {
        message = error?.response?.data?.message ?? message;
      }
      toast.error(message);
    },
  });
}
