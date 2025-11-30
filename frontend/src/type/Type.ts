export type Position = "Goalkeeper" | "Defender" | "Midfielder" | "Forward";

export interface PlayerFormValues {
  name: string;
  age: number;
  position: Position;
  jerseyNumber: number;
  avatarUrl?: string | undefined;
  nationality?: string | undefined;
}

export interface hello {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: PlayerFormValues | null;
}
