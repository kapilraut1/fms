import {
  Entity,
  Unique,
  PrimaryColumn,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
} from "typeorm";

import { IsUrl, IsOptional, Max, Min } from "class-validator";
export enum Position {
  Goalkeeper = "Goalkeeper",
  Defender = "Defender",
  Midfielder = "Midfielder",
  Forward = "Forward",
}

@Entity()
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 50,
  })
  name: string;

  @Column({
    type: "enum",
    enum: ["Goalkeeper", "Defender", "Midfielder", "Forward"],
  })
  position: Position;

  @Column({ unique: true, type: "int" })
  @Min(1, { message: "Jersey number must be between 1 and 99" })
  @Max(99, { message: "Jersey number must be between 1 and 99" })
  jerseyNumber: number;

  @Column()
  @Min(15, { message: "Age must be at least 15" })
  @Max(50, { message: "Age must be at most 50" })
  age: number;

  @Column({
    type: "varchar",
    nullable: true,
  })
  @IsOptional()
  @IsUrl({}, { message: "Invalid URL format" })
  avatarUrl?: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  nationality?: string;

  // @Column({ type: "boolean", default: false })
  // isStartingXI: boolean;
}
