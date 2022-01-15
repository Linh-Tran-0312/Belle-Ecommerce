import { getRepository } from "typeorm";
import { Blog } from "../models";
import { BaseRepository, IBaseRepository } from "./base.repository";

export interface IBlogRepository extends IBaseRepository<Blog> {}

export class BlogRepository extends BaseRepository<Blog> implements IBlogRepository{
    constructor() {
        super(getRepository(Blog));
    }

}