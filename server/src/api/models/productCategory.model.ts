import { Column, Entity } from "typeorm";
import { BaseEntity, IBaseEntity } from "./base.model";

export interface IProductCategoryCreateProps {   
    name: string;
    imgPath?: string;
}

export interface IProductCategory extends IProductCategoryCreateProps, IBaseEntity {};

@Entity()
export class ProductCategory extends BaseEntity implements IProductCategoryCreateProps{

    @Column()
    name!: string;

    @Column({nullable: true})
    imgPath!: string

}