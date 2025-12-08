import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { hello, Playerid, Position } from "../type/type";
import { useAddPlayer } from "@/hooks/useAddPlayer";
import { useUpdatePlayers } from "@/hooks/useUpdatePlayer";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useGetPlayers } from "@/hooks/useGetPlayers";

export function Add({ open, onOpenChange, initialData }: hello) {
  const { data } = useGetPlayers(1);
  const playerSchema = z.object({
    name: z.string().trim().min(1, "Name is required").max(50).toUpperCase(),
    age: z.number().int().min(15).max(50),
    position: z.enum(["Goalkeeper", "Defender", "Midfielder", "Forward"]),
    jerseyNumber: z
      .number()
      .int()
      .min(1)
      .max(99)
      .refine(
        (value) => {
          if (initialData) return true;
          const exist = data?.data?.some(
            (p: Playerid) => p.jerseyNumber === value
          );

          return !exist;
        },
        { message: "Jersey number already taken. Choose another one" }
      ),
    avatarUrl: z.url("Invalid URL format").trim().optional().or(z.literal("")),
    nationality: z.string().optional().nullable(),
  });
  type PlayerFormValues = z.infer<typeof playerSchema>;

  const defaultValues: PlayerFormValues = {
    name: "",
    age: NaN,
    position: "Goalkeeper",
    jerseyNumber: NaN,
    avatarUrl: "",
    nationality: "",
  };

  const addMutation = useAddPlayer();
  const updateMutation = useUpdatePlayers();
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<PlayerFormValues>({
    resolver: zodResolver(playerSchema),
    defaultValues,
  });
  const [err, setErr] = useState<string>();
  useEffect(() => {
    reset(
      initialData ?? {
        name: "",
        age: undefined,
        position: "Goalkeeper",
        jerseyNumber: undefined,
        avatarUrl: "",
        nationality: "",
      }
    );
    clearErrors();
  }, [initialData, reset, clearErrors]);

  useEffect(() => {
    if (!open) {
      reset();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setErr(undefined);
      clearErrors();
    }
  }, [open, reset, clearErrors]);

  const onSubmit = (formData: PlayerFormValues) => {
    const newPlayer = {
      name: formData.name,
      position: formData.position as Position,
      jerseyNumber: Number(formData.jerseyNumber),
      age: Number(formData.age),
      avatarUrl: formData.avatarUrl?.trim() || formData.avatarUrl || "",
      nationality: formData.nationality?.trim() || formData.nationality || "",
    };

    if (initialData?.id) {
      updateMutation.mutate(
        { id: initialData.id, player: newPlayer },
        {
          onSuccess: () => onOpenChange(false),
          onError: (error: Error) => {
            console.log(error);
            setErr(error.message);
          },
        }
      );
    } else {
      addMutation.mutate(newPlayer, {
        onSuccess: () => onOpenChange(false),
        onError: (error: Error) => {
          console.log(error);
          setErr(error.message);
        },
      });
    }
  };

  return (
    <Dialog
      key={initialData ? initialData.id : "new"}
      open={open}
      onOpenChange={onOpenChange}
    >
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
        {err && <span className="text-red-400">{err}</span>}

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          {/* Name */}
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input
              className="uppercase"
              {...register("name")}
              placeholder="Enter player name"
            />
            {errors.name && (
              <span className="text-red-400">{errors.name.message}</span>
            )}
          </div>

          {/* Age */}
          <div className="grid gap-2">
            <Label>Age</Label>
            <Input
              type="number"
              {...register("age", {
                setValueAs: (value) =>
                  value === "" ? undefined : Number(value),
              })}
              placeholder="age"
            />
            {errors.age && (
              <span className="text-red-400">{errors.age.message}</span>
            )}
          </div>

          {/* Position */}
          <div className="grid gap-2">
            <Label>Position</Label>
            <select
              {...register("position")}
              className="border p-2 rounded-md dark:bg-gray-500"
            >
              <option value="">Select Position</option>
              <option value="Goalkeeper">Goalkeeper</option>
              <option value="Defender">Defender</option>
              <option value="Midfielder">Midfielder</option>
              <option value="Forward">Forward</option>
            </select>
            {errors.position && (
              <span className="text-red-400">{errors.position.message}</span>
            )}
          </div>

          {/* Jersey Number */}
          <div className="grid gap-2">
            <Label>Jersey Number</Label>
            <Input
              type="number"
              {...register("jerseyNumber", {
                setValueAs: (value) =>
                  value === "" ? undefined : Number(value),
              })}
            />
            {errors.jerseyNumber && (
              <span className="text-red-400">
                {errors.jerseyNumber.message}
              </span>
            )}
          </div>

          {/* Avatar URL */}
          <div className="grid gap-2">
            <Label>Avatar URL (optional)</Label>
            <Input {...register("avatarUrl")} />
          </div>

          {/* Nationality */}
          <div className="grid gap-2">
            <Label>Nationality (optional)</Label>
            <Input {...register("nationality")} />
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
