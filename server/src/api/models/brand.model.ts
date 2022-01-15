import { Column, Entity } from "typeorm";
import { CustomBaseEntity } from "./base.model";


@Entity()
export class Brand extends CustomBaseEntity {

    @Column()
    name!: string;

    @Column({nullable: true})
    imgPath!: string;
    
}