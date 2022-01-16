import { getRepository } from "typeorm";
import { Blog } from "../models";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { Service } from "typedi";
export interface IBlogRepository extends IBaseRepository<Blog> {}

@Service()
export class BlogRepository extends BaseRepository<Blog> implements IBlogRepository{
    constructor() {
        super(getRepository(Blog));
    }

}