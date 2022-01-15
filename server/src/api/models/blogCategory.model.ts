import { Column, Entity } from "typeorm";
import { CustomBaseEntity } from "./base.model";


@Entity()
export class BlogCategory extends CustomBaseEntity  {
    @Column()
    name!: string;
}