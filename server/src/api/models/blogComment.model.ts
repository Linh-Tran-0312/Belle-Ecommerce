import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { IBaseEntity, BaseEntity  } from "./base.model";
import { Blog } from "./blog.model";
import { IUser, User } from "./user.model";

export interface IBlogCommentCreateProps {
    text: string;
    blogId: number;
    parentCommentId?: number;
    userId: string;
    user?:IUser;
}
export interface IBlogComment extends IBlogCommentCreateProps, IBaseEntity {
    childComments?: IBlogCommentCreateProps[];

};

@Entity()
export class BlogComment extends BaseEntity implements IBlogCommentCreateProps {

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

    @Column({nullable: true, type: "uuid"})
    userId!: string;

    @ManyToOne(() => User)
    @JoinColumn()
    user!: User;

    @OneToMany(() => BlogComment, blogComment => blogComment.parentComment)
    childComments!: Array<BlogComment>;
}