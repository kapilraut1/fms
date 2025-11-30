import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { hello } from "../type/Type";

type help = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;
export function Add({ open, onOpenChange, initialData }: hello) {
  const [form, setForm] = useState({
    name: "",
    age: 0,
    position: "",
    jerseyNumber: 0,
    avatarUrl: "",
    nationality: "",
  });

  const handleChange = (e: help) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const newForm = initialData
      ? {
          name: initialData.name || "",
          age: initialData.age || 0,
          position: initialData.position || "",
          jerseyNumber: initialData.jerseyNumber || 0,
          avatarUrl: initialData.avatarUrl || "",
          nationality: initialData.nationality || "",
        }
      : {
          name: "",
          age: 0,
          position: "",
          jerseyNumber: 0,
          avatarUrl: "",
          nationality: "",
        };

    // Only update state if values are different to avoid cascading renders
    if (
      form.name !== newForm.name ||
      form.age !== newForm.age ||
      form.position !== newForm.position ||
      form.jerseyNumber !== newForm.jerseyNumber ||
      form.avatarUrl !== newForm.avatarUrl ||
      form.nationality !== newForm.nationality
    ) {
      setForm(newForm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newPlayer = {
      name: form.name,
      position: form.position,
      jerseyNumber: Number(form.jerseyNumber),
      age: Number(form.age),
      avatarUrl: form.avatarUrl || null,
      nationality: form.nationality || null,
    };

    console.log("Submitting Player:", newPlayer);

    onOpenChange(false); // close parent-controlled dialog
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Player" : "Add Player"}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? "Update player details below."
              : "Fill in the player details."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* Name */}
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Age */}
          <div className="grid gap-2">
            <Label>Age</Label>
            <Input
              name="age"
              type="number"
              value={form.age}
              onChange={handleChange}
              required
            />
          </div>

          {/* Position */}
          <div className="grid gap-2">
            <Label>Position</Label>
            <select
              name="position"
              value={form.position}
              onChange={handleChange}
              className="border p-2 rounded-md"
              required
            >
              <option value="">Select Position</option>
              <option value="Goalkeeper">Goalkeeper</option>
              <option value="Defender">Defender</option>
              <option value="Midfielder">Midfielder</option>
              <option value="Forward">Forward</option>
            </select>
          </div>

          {/* Jersey Number */}
          <div className="grid gap-2">
            <Label>Jersey Number</Label>
            <Input
              name="jerseyNumber"
              type="number"
              value={form.jerseyNumber}
              onChange={handleChange}
              required
            />
          </div>

          {/* Avatar URL */}
          <div className="grid gap-2">
            <Label>Avatar URL (optional)</Label>
            <Input
              name="avatarUrl"
              value={form.avatarUrl}
              onChange={handleChange}
              placeholder="https://example.com/avatar.png"
            />
          </div>

          {/* Nationality */}
          <div className="grid gap-2">
            <Label>Nationality (optional)</Label>
            <Input
              name="nationality"
              value={form.nationality}
              onChange={handleChange}
              placeholder="Nepali"
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
