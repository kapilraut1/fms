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
import { useDeletePlayers } from "@/hooks/useDeletePlayer";
import { Del } from "@/type/Type";

export function Deletedialog({ open, playerid, onOpen }: Del) {
  const deleteMutation = useDeletePlayers();

  const handlebar = (e: React.MouseEvent) => {
    e.preventDefault();
    deleteMutation.mutate(playerid);
    onOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpen}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the selected players details?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handlebar}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
