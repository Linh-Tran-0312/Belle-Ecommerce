import { getRepository } from "typeorm";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { BlogComment } from "../models";
import { Service } from "typedi";

@Service({ id: "blogComment-repository"})
export class BlogCommentRepository extends BaseRepository<BlogComment> implements IBaseRepository<BlogComment> {
    constructor() {
        super(getRepository(BlogComment));
    }
    
}