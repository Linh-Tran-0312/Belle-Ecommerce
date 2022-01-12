import { Column, Entity } from "typeorm";
import { CustomBaseEntity, IBaseEntity } from "./base.model";

export interface IBrandCreateProps {
    name: string;
    imgPath?: string;
}

export interface IBrand extends IBrandCreateProps, IBaseEntity {};

@Entity()
export class Brand extends CustomBaseEntity {

    @Column()
    name!: string;

    @Column({nullable: true})
    imgPath!: string;
    
}