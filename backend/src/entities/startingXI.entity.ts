import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
} from "typeorm";
import { Player } from "./player.js";

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

@Entity()
@Unique(["position"])
export class StartingXI {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: "enum",
    enum: XIPosition,
  })
  position: XIPosition;

  @ManyToOne(() => Player, { eager: true })
  player: Player;
}
