"use client";
import { Subs } from "@/components/Substitutes";
import { useState } from "react";
import { useGetStartingXI } from "@/hooks/useGetStartingXI";
import { useAddStartingXI } from "@/hooks/useAddStartingXI";
import { Button } from "@/components/ui/button";
import { Player } from "@/type/Type";
import ShowPlayer from "@/components/player";

type Slots = Record<string, Player | null>;
type LocalSlots = Record<string, number | null>;

const SLOT_ORDER = {
  FWD: ["FWD1", "FWD2"],
  MID: ["MID1", "MID2", "MID3", "MID4"],
  DEF: ["DEF1", "DEF2", "DEF3", "DEF4"],
  GK: ["GK"],
};

export default function StartingXI() {
  const { data, isLoading, error, refetch } = useGetStartingXI();
  const saveXI = useAddStartingXI();

  const [editMode, setEditMode] = useState(false);
  const [localSlots, setLocalSlots] = useState<LocalSlots>({});

  const slots: Slots = data?.slots || {};
  const substitutes: Player[] = data?.substitute || [];

  // edit
  const startEdit = () => {
    const initial: LocalSlots = {};
    Object.entries(slots).forEach(([slot, player]) => {
      initial[slot] = player ? player.id : null;
    });
    setLocalSlots(initial);
    setEditMode(true);
  };

  const cancelEdit = () => {
    setLocalSlots({});
    setEditMode(false);
  };

  const assignPlayer = (slotKey: string, playerId: number | null) => {
    setLocalSlots((prev) => {
      if (playerId !== null && Object.values(prev).includes(playerId)) {
        return prev;
      }
      return { ...prev, [slotKey]: playerId };
    });
  };

  const handleSave = () => {
    const dataXI = {
      slots: Object.fromEntries(
        Object.entries(localSlots).map(([slot, playerId]) => [
          slot,
          Number(playerId),
        ])
      ),
    };

    saveXI.mutate(dataXI, {
      onSuccess: () => {
        setEditMode(false);
        setLocalSlots({});
        refetch();
      },
      onError: (err) => {
        console.error("Error saving Starting XI:", err);
        alert("Error saving Starting XI. Check console.");
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const allPlayers: Player[] = [
    ...substitutes,
    ...(Object.values(slots).filter(Boolean) as Player[]),
  ];

  const dynamicSubstitutes = allPlayers.filter(
    (p) => !Object.values(localSlots).includes(p.id)
  );

  // Determine player position from slotKey
  const slotPosition = (slotKey: string) =>
    slotKey.startsWith("FWD")
      ? "Forward"
      : slotKey.startsWith("MID")
      ? "Midfielder"
      : slotKey.startsWith("DEF")
      ? "Defender"
      : "Goalkeeper";

  const eligiblePlayers = (slotKey: string) =>
    dynamicSubstitutes.filter((p) => p.position === slotPosition(slotKey));

  // RENDER EACH SLOT
  const renderSlot = (slotKey: string) => {
    const playerId =
      (editMode ? localSlots[slotKey] : undefined) ??
      slots[slotKey]?.id ??
      null;

    const player = allPlayers.find((p) => p.id === playerId) ?? null;

    return (
      <ShowPlayer
        key={slotKey}
        player={player}
        playerId={playerId}
        editMode={editMode}
        assignPlayer={assignPlayer}
        eligiblePlayers={eligiblePlayers}
        slotKey={slotKey}
      />
    );
  };

  return (
    <div className="flex h-screen bg-green-500 dark:bg-green-700">
      {/* SUBSTITUTES */}
      <div className="w-[30%] p-4 bg-yellow-400 dark:bg-yellow-600 overflow-y-auto">
        <h2 className="text-black text-xl font-bold text-center mb-4">
          Substitutes
        </h2>

        {editMode ? (
          <Subs substitutes={dynamicSubstitutes} />
        ) : (
          <Subs substitutes={substitutes} />
        )}
      </div>

      {/* STARTING XI */}
      <div className="h-screen p-4 flex flex-col items-center w-[70%] overflow-auto">
        {!editMode ? (
          <Button className="mb-4" onClick={startEdit}>
            Change Players
          </Button>
        ) : (
          <div className="flex gap-4 mb-4">
            <Button onClick={handleSave}>Save XI</Button>
            <Button variant="destructive" onClick={cancelEdit}>
              Cancel
            </Button>
          </div>
        )}

        <h1 className="text-2xl text-black mb-4">Playing XI</h1>

        <div className="w-full max-w-4xl flex flex-col items-center gap-6">
          <div className="flex justify-center gap-4">
            {SLOT_ORDER.FWD.map(renderSlot)}
          </div>

          <div className="flex justify-center gap-4">
            {SLOT_ORDER.MID.map(renderSlot)}
          </div>

          <div className="flex justify-center gap-4">
            {SLOT_ORDER.DEF.map(renderSlot)}
          </div>

          <div className="flex justify-center gap-4">
            {SLOT_ORDER.GK.map(renderSlot)}
          </div>
        </div>
      </div>
    </div>
  );
}
