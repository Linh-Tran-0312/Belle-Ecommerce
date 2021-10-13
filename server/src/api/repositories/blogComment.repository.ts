import { getRepository } from "typeorm";
import { BlogComment, IBlogComment, IBlogCommentCreateProps } from "../models";
import { BaseRepository } from "./base.repository";

export class BlogCommentRepository extends BaseRepository<IBlogComment, BlogComment, IBlogCommentCreateProps> {
    constructor() {
        super(getRepository(BlogComment));
    }
   public async  getCommentsWithUser(blogId: number, options: any): Promise<IBlogComment[]> {
       try {
           let query =  this.entity.createQueryBuilder("comment")
           .leftJoinAndSelect("comment.user", "user")
           .where("comment.blogId = :blogId", { blogId })
           .andWhere("comment.parentCommentId IS NULL")    
           .leftJoinAndSelect("comment.childComments", "child")
           .leftJoinAndSelect("child.user", "subuser")
           .select([
               "comment.id","comment.text","comment.blogId","comment.createdAt",
               "user.id","user.fname","user.lname",
               "child.id","child.text","child.blogId","child.parentCommentId","child.createdAt",
               "subuser.id","subuser.fname","subuser.lname"
           ])
           .orderBy("comment.createdAt", "DESC")
           if(options.limit > 0) query =  query.limit(options.limit);
           if(!!options.date) query =  query.andWhere("comment.createdAt < :date", {date: new Date(options.date)})
            
            const comments: IBlogComment[] = await query.getMany();
            
            if(!comments) return [];
            return comments;

       } catch (error) {
        throw error;
        
       }
 
    
}
}