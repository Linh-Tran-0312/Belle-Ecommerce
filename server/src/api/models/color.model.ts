import { Column, Entity } from "typeorm";
import { CustomBaseEntity, IBaseEntity } from "./base.model";


@Entity()
export class Color  extends CustomBaseEntity  {

    @Column()
    code!: string

    @Column()
    name!: string;
}