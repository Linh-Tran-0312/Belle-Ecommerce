import { Column, Entity } from "typeorm";
import { BaseEntity, IBaseEntity } from "./base.model";

export interface IColorCreateProps {
    code: string;
    name: string;
}

export interface IColor extends IColorCreateProps, IBaseEntity {};

@Entity()
export class Color  extends BaseEntity implements IColorCreateProps {

    @Column()
    code!: string

    @Column()
    name!: string;
}