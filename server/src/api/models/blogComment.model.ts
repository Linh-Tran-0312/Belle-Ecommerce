import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Blog, User } from "./";

@Entity()
export class BlogComment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    text!: string;

    @ManyToOne(() => Blog, blog => blog.comments, { onDelete:"CASCADE"})
    blog!: Blog;

    @ManyToOne(() => BlogComment, blogComment => blogComment.childComments, { onDelete: "CASCADE", nullable: true})
    parentComment!: BlogComment;

    @ManyToOne(() => User)
    user!: User;

    @CreateDateColumn()
    createdAt!: Date;

    @OneToMany(() => BlogComment, blogComment => blogComment.parentComment)
    childComments!: Array<BlogComment>;
}