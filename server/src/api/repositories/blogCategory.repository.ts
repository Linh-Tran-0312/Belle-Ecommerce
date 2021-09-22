import { getRepository } from "typeorm";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { BlogCategory } from "../models";
import { Service } from "typedi";

@Service({ id: "blogCategory-repository"})
export class BlogCategoryRepository extends BaseRepository<BlogCategory> implements IBaseRepository<BlogCategory> {
    constructor() {
        super(getRepository(BlogCategory));
    }
}