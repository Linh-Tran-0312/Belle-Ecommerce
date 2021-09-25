import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity, IBaseEntity } from "./base.model";

export interface IBlogCategoryCreateProps {
    name: string;
}
export interface IBlogCategory extends IBlogCategoryCreateProps, IBaseEntity {}

@Entity()
export class BlogCategory extends BaseEntity implements IBlogCategoryCreateProps {
    @Column()
    name!: string;
}