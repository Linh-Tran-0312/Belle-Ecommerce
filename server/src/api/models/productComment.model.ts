import { CreateDateColumn, Column, PrimaryGeneratedColumn, Entity, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Product, User } from "./";

export interface IProductCommentModel {
    id?: number;
    text?: string;
    userId?: string;
    productId?: number;
    parentCommentId?: number;
}

@Entity()
export class ProductComment  {

    @PrimaryGeneratedColumn()
    id!: Number;

    @Column({nullable: true, type: "text"})
    text!: string;

    @Column("uuid")
    userId!: string;

    @ManyToOne(() => User)
    @JoinColumn()
    user!: User;

    @Column()
    productId!: number;

    @ManyToOne(() => Product, product => product.comments, { onDelete: "CASCADE"})
    @JoinColumn()
    product!: Product;

    @Column({nullable: true})
    parentCommentId!: number;

    @ManyToOne(() => ProductComment, productComment => productComment.childComments, { onDelete: "CASCADE", nullable: true})
    @JoinColumn()
    parentComment!: ProductComment;

    @CreateDateColumn({ type: "timestamptz"})
    createdAt!: Date;

    @OneToMany(() => ProductComment, productComment => productComment.parentComment)
    childComments!: Array<ProductComment>;

}