import { Column, Entity } from "typeorm";
import { CustomBaseEntity, IBaseEntity } from "./base.model";
 
@Entity()
export class Size extends CustomBaseEntity {

    @Column()
    name!: string;
}