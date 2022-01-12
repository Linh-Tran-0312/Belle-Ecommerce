import { Service } from "typedi";
import { ILike } from "typeorm";
import { Blog, IBlog, IBlogCreateProps } from "../models";
import { BlogRepository, IBlogRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";
import { Change } from "./index";

export enum BlogField {
    NAME = "title",
    DATE = "createdAt"

}
export interface IBlogQuery {
    category?: number,
    limit?: number,
    page?: number,
    sort?: BlogField,
    change?: Change,
    search?: string
}
export interface IBlogs {
    blogs: Blog[],
    total: number
}

export interface IBlogService extends IBaseService<Blog> {
    getBlogs(query: IBlogQuery): Promise<IBlogs>;
    createBlog(data: IBlogCreateProps): Promise<Blog>;
    updateBlog(id: number, data: IBlogCreateProps): Promise<IBlog>

};

@Service({ id: "blog-service" })
export class BlogService extends BaseService<Blog, IBlogRepository> implements IBlogService {
    constructor() {
        super(new BlogRepository())
    }

    public async getBlogs(query: IBlogQuery): Promise<IBlogs> {
        let options: any = {
            select: ["id", "title", "createdAt", "category", "imgPath", "content"],
            relations: ["category"],
            where: {},
            order: {}
        }

        if (query.category) options.where.categoryId = query.category;
        if (query.search) options.where.title = ILike(`%${query.search}%`);
        if (query.limit) options.take = query.limit;
        if (query.page) options.skip = options.take * (query.page - 1);
        options.order[`${query.sort}`] = query.change;
        let result: IBlogs = {
            blogs: [],
            total: 0
        }
        const [blogs, count] = await this.repository.findAndCount(options);
        result.blogs = blogs;
        result.total = count;
        return result
    }
    public async createBlog(data: IBlogCreateProps): Promise<Blog> {
        const { id } = await this.repository.create(data);
        const newBlog = await this.getOneById(id, ["category"]);
        return newBlog
    }
    public async updateBlog(id: number, data: IBlogCreateProps): Promise<IBlog> {
        await this.repository.update(id, data);
        const updatedBlog: IBlog = await this.getOneById(id, ["category"]);
        return updatedBlog;
    }
}