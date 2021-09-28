import { Service } from "typedi";
import { LessThan } from "typeorm";
import { BlogComment, IBlogComment} from "../models";
import { BlogCommentRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";

export interface IBlogCommentQuery  {
    limit: number,
    date: string,
}

@Service({ id: "blogComment-service"})
export class BlogCommentService extends BaseService<IBlogComment, BlogCommentRepository> implements IBaseService<IBlogComment>  {
    constructor() {
        super(new BlogCommentRepository())
    }

    async getCommentsOfBlog(blogId: number, query: IBlogCommentQuery): Promise<IBlogComment[]> {
        let options: any = {
            relations: ["childComments","user","childComments.user"],
             where: {
                 blogId: blogId,
                 parentCommentId: null
             },
             order: {
                 createdAt: "DESC"
             }
         }
        if(query.limit > 0) options.take = query.limit;
        if(!!query.date) options.where.createdAt = LessThan(new Date(query.date));
        const comments = await this.repository.find(options);
        comments.map(comment => {
           delete comment.user?.password;
           delete comment.user?.email;
           delete comment.user?.phone;
           delete comment.user?.address;
       })

       return comments;

    }
}