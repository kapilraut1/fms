import { useQuery } from "@tanstack/react-query";
import { getFormation } from "@/api/api";

export function useGetFormation() {
  return useQuery({
    queryKey: ["formation"],
    queryFn: () => getFormation(),
    refetchOnWindowFocus: true,
  });
}
