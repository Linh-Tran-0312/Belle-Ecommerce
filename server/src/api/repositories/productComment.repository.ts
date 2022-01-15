 import { getRepository } from "typeorm";
import { ProductComment } from "../models";
import { BaseRepository, IBaseRepository } from "./base.repository";
 

export interface IProductCommentRepository extends IBaseRepository<ProductComment> {}

/* @Service({ id: "productComment-repository"}) */
export class ProductCommentRepository extends BaseRepository<ProductComment> implements IProductCommentRepository {
    constructor() {
        super(getRepository(ProductComment));
    }
} 