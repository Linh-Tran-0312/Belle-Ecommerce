import { Column, Entity } from "typeorm";
import { CustomBaseEntity, IBaseEntity } from "./base.model";

export interface IBlogCategoryCreateProps {
    name: string;
}
export interface IBlogCategory extends IBlogCategoryCreateProps, IBaseEntity {}

@Entity()
export class BlogCategory extends CustomBaseEntity implements IBlogCategoryCreateProps {
    @Column()
    name!: string;
}