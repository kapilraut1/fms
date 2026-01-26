"use client";
import { Subs } from "@/components/Substitutes";
import { useState, useEffect } from "react";
import { useGetStartingXI } from "@/hooks/useGetStartingXI";
import { useAddStartingXI } from "@/hooks/useAddStartingXI";
import { Button } from "@/components/ui/button";
import ShowPlayer from "@/components/Player";
import Formation from "@/components/Formation";
import { toast } from "react-toastify";
import { Slots, LocalSlots, Player } from "../type/Type";
import Slotorder from "@/components/SlotOrder";
import Change from "@/components/Change";
export default function StartingXI() {
  const { data, isLoading, error, refetch } = useGetStartingXI();
  const form: string = data?.formation;
  const saveXI = useAddStartingXI();
  const [editMode, setEditMode] = useState(false);
  const [localSlots, setLocalSlots] = useState<LocalSlots>({});
  const [formation, setFormation] = useState<string>(form);
  const [savedFormation, setSavedFormation] = useState<string>("");
  const slots: Slots = data?.slots || {};
  const substitutes: Player[] = data?.substitute || [];

  useEffect(() => {
    setTimeout(() => {
      if (!form || editMode) return;
      setFormation((prev) => (prev === form ? prev : form));
      setSavedFormation((prev) => (prev === form ? prev : form));
    }, 0);
  }, [form, editMode]);

  const startEdit = () => {
    const initial: LocalSlots = {};
    for (const slot in slots) {
      const player = slots[slot];
      initial[slot] = player ? Number(player.id) : null;
    }
    setLocalSlots(initial);
    setEditMode(true);
  };

  const cancelEdit = () => {
    setLocalSlots({});
    setFormation(savedFormation);
    setEditMode(false);
  };

  const assignPlayer = (slotKey: string, playerId: number | null) => {
    setLocalSlots((prev) => {
      if (playerId !== null) {
        for (const key in prev) {
          if (prev[key] === playerId) {
            return { ...prev };
          }
        }
      }
      return { ...prev, [slotKey]: playerId };
    });
  };

  const handleSave = () => {
    const slots: Record<string, number> = {};
    for (const slot in localSlots) {
      const playerId = localSlots[slot];

      if (playerId === null || isNaN(playerId)) {
        toast.error(`Slot ${slot} is empty`);
      }

      slots[slot] = Number(playerId);
    }
    const dataXI = { slots, formation };

    saveXI.mutate(dataXI, {
      onSuccess: () => {
        setEditMode(false);
        setLocalSlots({});
        refetch();
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const allPlayers: Player[] = [
    ...substitutes,
    ...(Object.values(slots).filter(Boolean) as Player[]),
  ];

  //for substitutes
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
    const playerId = editMode
      ? localSlots[slotKey] ?? null
      : slots[slotKey]?.id ?? null;

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
      <div className="w-[30%] p-4 bg-yellow-400 dark:bg-yellow-600 overflow-y-auto hidden lg:block ">
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
      <div className="h-screen p-4 flex flex-col items-center w-full overflow-auto lg:w-[70%] ">
        {!editMode ? (
          <Button className="mb-4" onClick={startEdit}>
            Change Players
          </Button>
        ) : (
          <div className="flex gap-4 mb-4">
            <Formation formation={formation} setFormation={setFormation} />
            <Change />
            <Button onClick={handleSave}>Save XI</Button>
            <Button variant="destructive" onClick={cancelEdit}>
              Cancel
            </Button>
          </div>
        )}
        <h1 className="text-2xl text-black mb-4">Playing XI</h1>
        {/* <h2 className="text-lg text-black mb-2">Formation:{formation} </h2>" */}
        {formation && (
          <Slotorder
            formation={formation}
            setLocalSlots={setLocalSlots}
            renderSlot={renderSlot}
          />
        )}
      </div>
    </div>
  );
}
