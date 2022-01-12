import { Column, Entity } from "typeorm";
import { CustomBaseEntity, IBaseEntity } from "./base.model";

export interface ISizeCreateProps {
    name?: string;
}

export interface ISize extends ISizeCreateProps, IBaseEntity {};

@Entity()
export class Size extends CustomBaseEntity {

    @Column()
    name!: string;
}