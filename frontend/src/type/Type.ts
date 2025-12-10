export type Position = "Goalkeeper" | "Defender" | "Midfielder" | "Forward";
export type Theme = "light" | "dark";

export enum XIPosition {
  GK = "GK",
  DEF1 = "DEF1",
  DEF2 = "DEF2",
  DEF3 = "DEF3",
  DEF4 = "DEF4",
  MID1 = "MID1",
  MID2 = "MID2",
  MID3 = "MID3",
  MID4 = "MID4",
  FWD1 = "FWD1",
  FWD2 = "FWD2",
}
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

export interface del {
  open: boolean;
  playerid: number;
  onOpen: (open: boolean) => void;
}
export interface hello {
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

export interface starters {
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
