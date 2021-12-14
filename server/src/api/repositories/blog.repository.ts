import { getRepository } from "typeorm";
import { Blog, IBlog, IBlogCreateProps } from "../models";
import { BaseRepository } from "./base.repository";
import { PostgresError } from "../helpers/PostgresError";
export interface IBlogs {
    blogs: Blog[],
    total: number
}

export class BlogRepository extends BaseRepository<IBlog, Blog, IBlogCreateProps> {
    constructor() {
        super(getRepository(Blog));
    }
    public async findAndCount(options: any): Promise<IBlogs> {
        try {
            let result: IBlogs = {
                blogs: [],
                total: 0
            }
            const [ blogs, count ] = await this.entity.findAndCount(options);
            result.blogs = blogs;
            result.total = count;
            console.log("Blog repo");
            return  result;
        } catch (err: any) {
            throw new PostgresError(err.message, err);
        } 
    }
}