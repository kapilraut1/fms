import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Player } from "./player.js";

@Entity()
export class StartingXI {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  position: string;

  @ManyToOne(() => Player, { eager: true })
  player: Player;
}
