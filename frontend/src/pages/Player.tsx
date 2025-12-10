import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { useGetPlayers } from "@/hooks/useGetPlayers";
// import { useDeletePlayers } from "@/hooks/useDeletePlayer";
import { Add } from "../components/add";
import { Playerid } from "@/type/Type";
import { Deletedialog } from "@/components/deletedialog";
export default function Player() {
  const [open, setOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Playerid | null>(null);
  const [del, setDel] = useState(false);
  const [deleteid, setDeleteId] = useState<number>();
  const handleEdit = (players: Playerid): void => {
    setEditingPlayer(players);
    setOpen(true);
  };
  const handleDelete = (player: Playerid): void => {
    setDeleteId(player.id);
    setDel(true);
  };

  const handleAddNew = () => {
    setEditingPlayer(null);
    setOpen(true);
  };
  const [page, setpage] = useState(1);
  const { isLoading, data } = useGetPlayers(page);
  if (isLoading) {
    return "Loading...";
  }
  return (
    <>
      <Add
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) setEditingPlayer(null);
        }}
        initialData={editingPlayer}
      />
      <Deletedialog open={del} playerid={deleteid ?? 0} onOpen={setDel} />

      <div className="flex justify-end pr-4 mb-4">
        <button
          onClick={handleAddNew}
          className="px-4 py-2 border rounded bg-orange-300 dark:bg-orange-500 dark:hover:rounded-lg dark:hover:bg-orange-400 hover:bg-amber-500 hover:rounded-full"
        >
          Add New Player
        </button>
      </div>
      <DataTable
        data={(data?.data as Playerid[]) ?? []}
        page={page}
        pageCount={data?.meta?.totalPages ?? 1}
        onPageChange={setpage}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </>
  );
}
