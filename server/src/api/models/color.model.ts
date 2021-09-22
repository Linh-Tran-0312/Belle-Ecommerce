import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

export interface IColorModel {
    id?: number;
    name?: string;
    code?: string;  
}

@Entity()
export class Color  {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    code!: string

    @Column()
    name!: string;
}