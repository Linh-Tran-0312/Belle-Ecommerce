import { Service } from "typedi";
import { LessThan } from "typeorm";
import { BlogComment } from "../models";
import { BlogCommentRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";


@Service({ id: "blogComment-service"})
export class BlogCommentService extends BaseService<BlogComment, BlogCommentRepository> implements IBaseService<BlogComment>  {
    constructor() {
        super(new BlogCommentRepository())
    }

    async getCommentsOfBlog(blogId: number, date?: Date): Promise<BlogComment[]> {
        let options: any = {
            relations: ["childComments","user","childComments.user"],
             where: {
                 blogId: blogId
             },
             order: {
                 createdAt: "DESC"
             },
             take: 2
         }
        if(date) options.where.createdAt = LessThan(date);
       return this.repository.findWithCondition(options)
    }
}