import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Brand, ProductCategory, ProductComment, ProductVariant, ProductReview } from './';

export interface IProductModel {
    id?: number;
    sku?: string;
    categoryId?: number;
    brandId?: number;
    imgPaths?: string[];
    name?: string;
    summary?: string;
    description?: string;
    overallReview?: number;
    reviewCount?: number;
    price?: number;   
}

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id!: number;

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

    @CreateDateColumn({ type: "timestamptz"})
    createdAt!: Date;

    @OneToMany(() => ProductComment, productComment => productComment.product)
    comments!: Array<ProductComment>;

    @OneToMany(() => ProductVariant, productVariant => productVariant.product)
    variantList!: Array<ProductVariant>;

    @OneToMany(() => ProductReview, productReview => productReview.product )
    reviews!: Array<ProductReview>;
}