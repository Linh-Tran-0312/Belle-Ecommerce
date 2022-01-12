import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { CustomBaseEntity, IBaseEntity } from "./base.model";
import { Blog } from "./blog.model";
import { IUser, User } from "./user.model";

export interface IBlogCommentCreateProps {
    text: string;
    blogId: number;
    parentCommentId?: number;
    userId: number;
}
export interface IBlogComment extends IBlogCommentCreateProps, IBaseEntity {
    childComments?: IBlogCommentCreateProps[];
    user?:IUser;

};

@Entity()
export class BlogComment extends CustomBaseEntity  {

    @Column()
    text!: string;

    @Column()
    blogId!: number;

    @ManyToOne(() => Blog, { onDelete:"CASCADE"})
    @JoinColumn()
    blog!: Blog;

    @Column({nullable: true})
    parentCommentId!: number;

    @ManyToOne(() => BlogComment, blogComment => blogComment.childComments, { onDelete: "CASCADE", nullable: true})
    @JoinColumn()
    parentComment!: BlogComment;

    @Column({nullable: true})
    userId!: number;

    @ManyToOne(() => User)
    @JoinColumn()
    user!: User;

    @OneToMany(() => BlogComment, blogComment => blogComment.parentComment)
    childComments!: Array<IBlogComment>;
}