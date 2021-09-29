import { Column, Entity } from "typeorm";
import { CustomBaseEntity, IBaseEntity } from "./base.model";

export interface IProductCategoryCreateProps {   
    name: string;
    imgPath?: string;
}

export interface IProductCategory extends IProductCategoryCreateProps, IBaseEntity {};

@Entity()
export class ProductCategory extends CustomBaseEntity implements IProductCategoryCreateProps{

    @Column()
    name!: string;

    @Column({nullable: true})
    imgPath!: string

}