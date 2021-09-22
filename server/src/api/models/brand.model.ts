import { Entity, CreateDateColumn, Column, PrimaryGeneratedColumn } from "typeorm";

export interface IBrandModel {
    id?: number;
    name?: string;
    imgPath?: string;
}

@Entity()
export class Brand {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({nullable: true})
    imgPath!: string;

    @CreateDateColumn({ type: "timestamptz"})
    createdAt!: Date;

}