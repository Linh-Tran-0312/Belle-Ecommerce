import { getRepository } from "typeorm";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { IProductReviewCreateProps, ProductReview, IProductReview } from "../models";
import { Service } from "typedi";

export interface IProductReviewRepository extends IBaseRepository<ProductReview> {}

/* @Service({ id: "productReview-repository"}) */
export class ProductReviewRepository extends BaseRepository<ProductReview>  implements IProductReviewRepository{
    constructor() {
        super(getRepository(ProductReview));
    }
} 