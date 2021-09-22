import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Blog, User } from "./";

export interface IBlogCommentModel {
    id?: number;
    text?: string;
    blogId?: number;
    parentCommentId?: number;
    userId?: string;
}

@Entity()
export class BlogComment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    text!: string;

    @Column()
    blogId!: number;

    @ManyToOne(() => Blog, blog => blog.comments, { onDelete:"CASCADE"})
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

    @CreateDateColumn({ type: "timestamptz"})
    createdAt!: Date;

    @OneToMany(() => BlogComment, blogComment => blogComment.parentComment)
    childComments!: Array<BlogComment>;
}