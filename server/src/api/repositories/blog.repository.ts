import { getRepository } from "typeorm";
import { Blog, IBlog, IBlogCreateProps } from "../models";
import { BaseRepository } from "./base.repository";

export class BlogRepository extends BaseRepository<IBlog, Blog, IBlogCreateProps> {
    constructor() {
        super(getRepository(Blog));
    }
}