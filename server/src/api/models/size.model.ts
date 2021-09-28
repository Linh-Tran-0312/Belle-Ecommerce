import { Column, Entity } from "typeorm";
import { BaseEntity, IBaseEntity } from "./base.model";

export interface ISizeCreateProps {
    name?: string;
}

export interface ISize extends ISizeCreateProps, IBaseEntity {};

@Entity()
export class Size extends BaseEntity implements ISizeCreateProps{

    @Column()
    name!: string;
}