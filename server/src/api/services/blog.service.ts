import { Inject, Service } from "typedi";
import { Blog } from "../models";
import { BlogRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";
import { ILike } from "typeorm";

@Service({ id: "blog-service" })
export class BlogService extends BaseService<Blog, BlogRepository> implements IBaseService<Blog>  {
    constructor() {
        super(new BlogRepository())
    }
    public async getCurrentBlogs():  Promise<Blog[]> {
        let options = {
            order: {
                createdAt: "DESC"
            },
            take: 5
        }
        return this.repository.findWithCondition(options)
    }
    public async searchBlogs(categoryId?: number, keyword?: string): Promise<Blog[]> {
        let options: any = {}
        if (categoryId && !isNaN(categoryId)) options.where.categoryId = categoryId;
        if (keyword) options.where.title = ILike(`%${keyword}%`)
        return this.repository.findWithCondition(options);

    }
}