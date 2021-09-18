import { CreateDateColumn, Column, PrimaryGeneratedColumn, Entity, ManyToOne, OneToMany } from "typeorm";
import { Product, User } from "./";

@Entity()
export class ProductComment  {

    @PrimaryGeneratedColumn()
    id!: Number;

    @Column({nullable: true, type: "text"})
    text!: string;

    @ManyToOne(() => User)
    user!: User;

    @ManyToOne(() => Product, product => product.comments, { onDelete: "CASCADE"})
    product!: Product;

    @ManyToOne(() => ProductComment, productComment => productComment.childComments, { onDelete: "CASCADE", nullable: true})
    parentComment!: ProductComment;

    @CreateDateColumn()
    createdAt!: Date;

    @OneToMany(() => ProductComment, productComment => productComment.parentComment)
    childComments!: Array<ProductComment>;

}