import { Inject, Service } from "typedi";
import { Blog, IBlog } from "../models";
import { BlogRepository, BaseRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";
import { ILike, LessThan } from "typeorm";

export interface IBlogQuery  {
    category: number,
    limit: number,
    date: string,
    search: string
}
@Service({ id: "blog-service" })
export class BlogService extends BaseService<IBlog, BlogRepository> implements IBaseService<IBlog>  {
    constructor() {
        super(new BlogRepository())
    }

    public async getBlogs(query: IBlogQuery): Promise<IBlog[]> {
        let options: any = {
            where: {},
            order: {
                createdAt: "DESC"
            },
        }
        if (query.category > 0 ) options.where.categoryId = query.category;
        if (!!query.search) options.where.title = ILike(`%${query.search}%`);
        if(query.limit > 0) options.take = query.limit;
        if(!!query.date) options.where.createdAt = LessThan(new Date(query.date));  
        return this.repository.find(options);
    }
}