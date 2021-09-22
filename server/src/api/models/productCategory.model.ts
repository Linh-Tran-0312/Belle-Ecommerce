import { CreateDateColumn, Column, PrimaryGeneratedColumn, Entity } from "typeorm";

export interface IProductCategoryModel {
    id?: number;
    name?: string;
    imgPath?: number;
}

@Entity()
export class ProductCategory {

    @PrimaryGeneratedColumn()
    id!: Number;

    @Column()
    name!: string;

    @Column({nullable: true})
    imgPath!: string

    @CreateDateColumn({ type: "timestamptz"})
    createdAt!: Date;

}