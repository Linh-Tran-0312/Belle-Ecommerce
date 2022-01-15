
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { CustomBaseEntity } from "./base.model";
import { BlogCategory } from "./blogCategory.model";
 
@Entity()
export class Blog extends CustomBaseEntity  {

    @Column()
    title!: string;

    @Column({nullable: true})
    categoryId!: number;

    @ManyToOne(() => BlogCategory, { onDelete: "CASCADE"})
    @JoinColumn()
    category!: BlogCategory;

    @Column({nullable: true})
    imgPath!: string;

    @Column({type: "text"})
    content!: string;

    @Column({default: true})
    commentAllow!: boolean;

}