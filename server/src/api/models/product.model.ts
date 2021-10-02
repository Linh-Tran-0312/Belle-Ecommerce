import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Brand, ProductCategory, ProductComment, ProductReview, ProductVariant } from './';
import { CustomBaseEntity, IBaseEntity } from "./base.model";
import { IBrand } from "./brand.model";
import { IProductCategory, IProductCategoryCreateProps } from "./productCategory.model";
import { IProductVariant } from "./productVariant.model";

export interface IProductCreateProps {
    sku?: string;
    categoryId: number;
    brandId: number;
    imgPaths?: string[];
    name: string;
    summary?: string;
    description?: string;
    price: number;   
}

export interface IProduct extends IProductCategoryCreateProps, IBaseEntity {
    category?: IProductCategory;
    brand?: IBrand;
    overallReview?: number;
    reviewCount?: number;
    variants?: IProductVariant[];
};

@Entity()
export class Product extends CustomBaseEntity implements IProductCreateProps {


    @Column({nullable: true})
    sku!: string;

    @Column({nullable: true})
    categoryId!: number;

    @ManyToOne(() => ProductCategory, { onDelete: 'SET NULL'})
    @JoinColumn()
    category!: ProductCategory;

    @Column({nullable: true})
    brandId!: number;

    @ManyToOne(() => Brand, { onDelete: 'SET NULL'})
    @JoinColumn()
    brand!: Brand;

    @Column()
    name!: string;

    @Column({ nullable: true, type: "text"})
    summary!: string;

    @Column({ nullable: true, type: "text"})
    description!: string;

    @Column({type: "decimal", precision: 3, scale: 2 ,default: 0.00})
    overallReview!: number;

    @Column({default: 0})
    reviewCount!: number;

    @Column()
    price!: number;

    @Column("simple-array",{ nullable: true})
    imgPaths!: string[];


    @OneToMany(() => ProductComment, productComment => productComment.product)
    comments!: Array<ProductComment>;

    @OneToMany(() => ProductVariant, productVariant => productVariant.product)
    variants!: Array<ProductVariant>;

    @OneToMany(() => ProductReview, productReview => productReview.product )
    reviews!: Array<ProductReview>;
}