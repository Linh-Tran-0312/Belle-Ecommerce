import { Entity, CreateDateColumn, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Brand {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({nullable: true})
    imgPath!: string;

    @CreateDateColumn()
    createdAt!: Date;

}