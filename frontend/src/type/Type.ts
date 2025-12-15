export type Position = "Goalkeeper" | "Defender" | "Midfielder" | "Forward";
export type Theme = "light" | "dark";

export type XIPosition = `${"GK" | "DEF" | "MID" | "FWD"}${number}`;

import { AxiosError } from "axios";
export interface Prop {
  substitutes: PlayerType[];
}
type PlayerType = {
  id: number;
  name: string;
  position: string;
  jerseyNumber: number;
  avatarUrl?: "";
};
export interface PlayerFormValues {
  name: string;
  age: number;
  position: Position;
  jerseyNumber: number;
  avatarUrl?: string;
  nationality?: string;
}

export interface Playerid extends PlayerFormValues {
  id: number;
}

export interface Del {
  open: boolean;
  playerid: number;
  onOpen: (open: boolean) => void;
}
export interface Adder {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: Playerid | null;
}
export interface SquadInfo {
  current: number;
  max: number;
  breakdown: Record<string, number>;
}

export interface GetPlayersResponse {
  data: Playerid[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  squad: SquadInfo;
}

export interface Starters {
  position: XIPosition;
  player: { id: number };
}

export type Player = {
  id: number;
  name: string;
  position: string;
  jerseyNumber: number;
  avatarUrl?: "";
};

export type Props = {
  playerId?: number | null;
  player: Player | null;
  editMode?: boolean;
  assignPlayer?: (slotKey: string, playerId: number | null) => void;
  eligiblePlayers?: (slotKey: string) => Player[];
  slotKey?: string;
};

export type Format = {
  formation: string;
  setFormation: (newFormation: string) => void;
};

export type Slots = Record<string, Player | null>;
export type LocalSlots = Record<string, number | null>;

export type FormationType = {
  formation: string;
  setLocalSlots: React.Dispatch<React.SetStateAction<LocalSlots>>;
  renderSlot: (slotkey: string) => React.ReactNode;
};

export type Formationobj = {
  id: number;
  formation: string;
};

export type BackError = AxiosError<{ message: string }>;
