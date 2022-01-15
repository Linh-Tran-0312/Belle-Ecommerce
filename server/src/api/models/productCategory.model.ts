import { Column, Entity } from "typeorm";
import { CustomBaseEntity, IBaseEntity } from "./base.model";

 
@Entity()
export class ProductCategory extends CustomBaseEntity {

    @Column()
    name!: string;

    @Column({nullable: true})
    imgPath!: string

}