import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Size {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;
}