 import { getRepository } from "typeorm";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { ProductComment, IProductComment, IProductCommentCreateProps } from "../models";
import { Service } from "typedi";
 

export interface IProductCommentRepository extends IBaseRepository<ProductComment> {}

/* @Service({ id: "productComment-repository"}) */
export class ProductCommentRepository extends BaseRepository<ProductComment> implements IProductCommentRepository {
    constructor() {
        super(getRepository(ProductComment));
    }
} 