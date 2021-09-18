import { getRepository } from "typeorm";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { Blog } from "../models";
import { Service } from "typedi";

@Service({ id: "blog-repository"})
export class BlogRepository extends BaseRepository<Blog> implements IBaseRepository<Blog> {
    constructor() {
        super(getRepository(Blog));
    }

    public findOneWithRelations(id: number | string, relations: string[]): Promise<Blog | undefined> {
        return this.entity.findOne(id, {relations: relations})
    }
}