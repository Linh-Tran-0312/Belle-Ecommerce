import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Product, User } from "./";
import { CustomBaseEntity } from "./base.model";
 
@Entity()
export class ProductComment extends CustomBaseEntity {

    @Column({type: "text"})
    text!: string;

    @Column()
    userId!: number;

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


    @OneToMany(() => ProductComment, productComment => productComment.parentComment)
    childComments!: Array<ProductComment>;

}