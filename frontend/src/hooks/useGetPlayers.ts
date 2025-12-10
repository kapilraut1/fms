import { useQuery } from "@tanstack/react-query";
import { getPlayers } from "@/api/api";
import { GetPlayersResponse } from "@/type/Type";

export function useGetPlayers(page: number, limit: number = 10) {
  return useQuery<GetPlayersResponse, Error>({
    queryKey: ["players", page, limit],
    queryFn: () => getPlayers(page, limit),
    refetchOnWindowFocus: true,
  });
}
