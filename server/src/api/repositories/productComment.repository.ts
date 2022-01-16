 import { getRepository } from "typeorm";
import { ProductComment } from "../models";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { Service } from "typedi";

export interface IProductCommentRepository extends IBaseRepository<ProductComment> {}

@Service()
export class ProductCommentRepository extends BaseRepository<ProductComment> implements IProductCommentRepository {
    constructor() {
        super(getRepository(ProductComment));
    }
} 