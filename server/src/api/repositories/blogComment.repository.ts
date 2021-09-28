import { getRepository } from "typeorm";
import { BlogComment, IBlogComment, IBlogCommentCreateProps } from "../models";
import { BaseRepository } from "./base.repository";

export class BlogCommentRepository extends BaseRepository<IBlogComment, BlogComment, IBlogCommentCreateProps> {
    constructor() {
        super(getRepository(BlogComment));
    }
 /*    public async getCommentsWithUser(): Promise<IBlogComment> {
        return  
    } */
}