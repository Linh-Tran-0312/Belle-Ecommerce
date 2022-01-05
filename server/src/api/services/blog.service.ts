import { Inject, Service } from "typedi";
import { Blog, IBlog, IBlogCreateProps } from "../models";
import { BlogRepository, BaseRepository, IBlogs } from "../repositories";
import { BaseService, IBaseService} from "./base.service";
import { Change } from "./index";
import { ILike, LessThan, Like } from "typeorm";
import { IBlogUpdateProps } from "../controllers/blogController";
 
export enum BlogField {
    NAME = "title",
    DATE = "createdAt"

}
export interface IBlogQuery  {
    category: number,
    limit: number,
    page: number,
    sort: BlogField,
    change: Change,
    search: string
}
@Service({ id: "blog-service" })
export class BlogService extends BaseService<IBlog, BlogRepository> implements IBaseService<IBlog>  {
    constructor() {
        super(new BlogRepository())
    }

    public async getBlogs(query: IBlogQuery): Promise<IBlogs> {
        let options: any = {
            select:["id","title","createdAt","category","imgPath","content"],
            relations:["category"],
            where: {},
            order: {}
        }
        if (query.category > 0 ) options.where.categoryId = query.category;
        if (!!query.search) options.where.title = ILike(`%${query.search}%`);
        if(query.limit > 0) options.take = query.limit;
        if(query.page > 0) options.skip = query.limit*(query.page - 1);
        if(!!query.sort && !!query.change ) {
            options.order[`${query.sort}`] = query.change
        } 
        const result: IBlogs = await this.repository.findAndCount(options);
        if(!result) return { blogs: [], total: 0}
        return result
    }
    public async createBlog(data: IBlogCreateProps): Promise<IBlog> {
        const { id } = await this.repository.create(data);
        const newBlog: IBlog = await this.getOneById(id,["category"]);
        return newBlog
    }
    public async updateBlog(id: number, data: IBlogUpdateProps ): Promise<IBlog> {
        await this.repository.update(id, data);
        const updatedBlog: IBlog = await this.getOneById(id,["category"]);
        return updatedBlog;
    }
}