import { Service } from "typedi";
import { BlogComment  } from "../models";
import { BlogCommentRepository, IBlogCommentRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";

export interface IBlogCommentQuery  {
    limit: number,
    date: string,
}

export interface IBlogCommentService extends IBaseService<BlogComment> {
    getCommentsOfBlog(blogId: number, query: IBlogCommentQuery): Promise<BlogComment[]>
}

@Service({ id: "blogComment-service"})
export class BlogCommentService extends BaseService<BlogComment, IBlogCommentRepository> implements IBlogCommentService  {
    constructor() {
        super(new BlogCommentRepository())
    }
    async getCommentsOfBlog(blogId: number, query: IBlogCommentQuery): Promise<BlogComment[]> {
        const result = await this.repository.getCommentsWithUser(blogId, query);
        return result;
    }
}