import { Column, Entity } from "typeorm";
import { BaseEntity, IBaseEntity } from "./base.model";

export interface IBrandCreateProps {
    name: string;
    imgPath?: string;
}

export interface IBrand extends IBrandCreateProps, IBaseEntity {};

@Entity()
export class Brand extends BaseEntity implements IBrandCreateProps{

    @Column()
    name!: string;

    @Column({nullable: true})
    imgPath!: string;
    
}