import { CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export interface IBaseEntity {
    id: number;
    createdAt: Date;
}

export class CustomBaseEntity implements IBaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @CreateDateColumn({ type: "timestamptz"})
    createdAt!: Date;

}