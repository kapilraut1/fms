import { useQuery } from "@tanstack/react-query";
import { getStartingXI } from "@/api/api";

export function useGetStartingXI() {
  return useQuery({
    queryKey: ["startingXI"],
    queryFn: () => getStartingXI(),
    refetchOnWindowFocus: true,
  });
}
