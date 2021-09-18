import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Brand, ProductCategory, ProductComment, ProductVariant, ProductReview } from './';



@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id!: Number;

    @Column({nullable: true})
    sku!: string;

    @ManyToOne(() => ProductCategory, { onDelete: 'SET NULL'})
    category!: ProductCategory;

    @ManyToOne(() => Brand, { onDelete: 'SET NULL'})
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
    imagePaths!: string[];

    @CreateDateColumn()
    createdAt!: Date;

    @OneToMany(() => ProductComment, productComment => productComment.product)
    comments!: Array<ProductComment>;

    @OneToMany(() => ProductVariant, productVariant => productVariant.product)
    variantList!: Array<ProductVariant>;

    @OneToMany(() => ProductReview, productReview => productReview.product )
    reviews!: Array<ProductReview>;
}