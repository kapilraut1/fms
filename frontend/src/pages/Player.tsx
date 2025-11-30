import { useState } from "react";
import Data from "@/components/dashboard/data.json";
import { DataTable } from "@/components/data-table";
import { Add } from "../components/Add";
import { PlayerFormValues } from "@/type/Type";
export default function Player() {
  const [open, setOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<PlayerFormValues | null>(
    null
  );

  const handleEdit = (player: PlayerFormValues): void => {
    setEditingPlayer(player);
    setOpen(true);
  };

  const handleAddNew = () => {
    setEditingPlayer(null);
    setOpen(true);
  };

  return (
    <>
      <Add open={open} onOpenChange={setOpen} initialData={editingPlayer} />

      <div className="flex justify-end pr-4 mb-4">
        <button
          onClick={handleAddNew}
          className="px-4 py-2 border rounded bg-amber-300 hover:bg-amber-500"
        >
          Add New Player
        </button>
      </div>
      <DataTable
        data={Data.map((player) => ({
          ...player,
          position: player.position as
            | "Goalkeeper"
            | "Defender"
            | "Midfielder"
            | "Forward",
        }))}
        handleEdit={handleEdit}
      />
    </>
  );
}
