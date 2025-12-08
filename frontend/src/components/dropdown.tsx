"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type PlayerType = {
  id: number;
  name: string;
  position: string;
  jerseyNumber: number;
};

interface Props {
  substitutes: PlayerType[];
}

export function DropdownPosition({ substitutes }: Props) {
  const [position, setPosition] = React.useState("Goalkeeper");

  // Filter substitutes by selected position
  const filteredPlayers = substitutes.filter((p) => p.position === position);

  return (
    <div className="flex flex-col gap-2">
      {/* Dropdown to select position */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Select Position</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-2.5 sm:w-52 text-center">
          <DropdownMenuLabel>Player Position</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="Goalkeeper">
              Goalkeeper
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Defender">
              Defender
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Midfielder">
              Midfielder
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Forward">
              Forward
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Show filtered substitutes */}
      <h1 className="text-center font-bold">{position}</h1>
      {filteredPlayers.length === 0 && (
        <h1 className="font-bold text-center text-black">No subs</h1>
      )}
      <div className="flex flex-wrap gap-4 justify-center">
        {filteredPlayers.map((player) => (
          <div key={player.id} className="flex flex-col items-center w-24">
            {/* Jersey Number */}
            <div className="w-15 h-15 rounded-full md:w-20 md:h-20 bg-white dark:bg-gray-500 flex items-center justify-center">
              {player.jerseyNumber}
            </div>
            <div className="text-sm font-semibold mt-1 flex items-center justify-center">
              {player.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
