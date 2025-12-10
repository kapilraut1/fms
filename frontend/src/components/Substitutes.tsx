"use client";
import ShowPlayer from "./Player";

import { Prop } from "@/type/Type";

export function Subs({ substitutes }: Prop) {
  const positions = ["Goalkeeper", "Defender", "Midfielder", "Forward"];
  return (
    <div className="flex flex-col gap-2">
      {positions.map((pos) => {
        const filteredPlayers = substitutes.filter(
          (player) => player.position === pos
        );

        if (filteredPlayers.length == 0) {
          return (
            <div className="mb-6">
              <h1 className="text-center font-bold">{pos}</h1>
              <h2 className="text-center">No players found</h2>
            </div>
          );
        }
        return (
          <div key={pos} className="mb-6">
            <h1 className="text-center font-bold">{pos}</h1>

            <div className="flex flex-wrap gap-4 justify-center m-2">
              {filteredPlayers.map((player) => (
                <ShowPlayer player={player} key={player.id} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
