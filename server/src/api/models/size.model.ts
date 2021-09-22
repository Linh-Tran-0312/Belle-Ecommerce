import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

export interface ISizeModel {
    id?: number;
    name?: string;
}

@Entity()
export class Size {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;
}