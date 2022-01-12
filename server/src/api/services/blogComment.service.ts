import { Service } from "typedi";
import { LessThan } from "typeorm";
import { BlogComment, IBlogComment} from "../models";
import { BlogCommentRepository, IBlogCommentRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";

export interface IBlogCommentQuery  {
    limit: number,
    date: string,
}

export interface IBlogCommentService extends IBaseService<BlogComment> {
    getCommentsOfBlog(blogId: number, query: IBlogCommentQuery): Promise<IBlogComment[]>
}

@Service({ id: "blogComment-service"})
export class BlogCommentService extends BaseService<BlogComment, IBlogCommentRepository> implements IBlogCommentService  {
    constructor() {
        super(new BlogCommentRepository())
    }
    async getCommentsOfBlog(blogId: number, query: IBlogCommentQuery): Promise<IBlogComment[]> {
        const result = await this.repository.getCommentsWithUser(blogId, query);
        return result;
    }
}