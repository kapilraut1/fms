"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Formationobj } from "@/type/Type";
import { useGetFormation } from "@/hooks/useGetFormation";
import { useAddFormation } from "@/hooks/useAddFormation";
import { useDeleteFormation } from "@/hooks/useDeleteFormation";

const Change = () => {
  const { data } = useGetFormation();
  const addFormation = useAddFormation();
  const deleteFormationMutation = useDeleteFormation();
  const [newFormation, setNewFormation] = useState("");

  const handleAdd = () => {
    addFormation.mutate(newFormation);
    setNewFormation("");
  };

  const handleDelete = (id: number) => {
    deleteFormationMutation.mutate(id);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Customize formations</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Customize Formations</DialogTitle>
          <DialogDescription>
            You can add new formations or delete existing ones.
          </DialogDescription>
        </DialogHeader>

        {/* Add Formation */}
        <div className="flex items-center gap-2 mt-4">
          <Input
            value={newFormation}
            onChange={(e) => setNewFormation(e.target.value)}
            placeholder="4-3-3"
            className="flex-1"
          />
          <Button onClick={handleAdd} className="bg-blue-500 text-white">
            Add
          </Button>
        </div>

        {/* List of formations */}
        <ul className="mt-4 space-y-2">
          {data?.map((f: Formationobj) => (
            <li
              key={f.id}
              className="flex justify-between items-center border p-2 rounded"
            >
              <span>{f.formation}</span>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(f.id)}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>

        <DialogFooter className="sm:justify-start mt-4">
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Change;
