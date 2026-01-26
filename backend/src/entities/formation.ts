import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity()
export class FormationManagement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  formation: string;

  @Column({ default: false })
  isSelected: boolean;
}
