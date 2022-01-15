import { getRepository } from "typeorm";
import { ProductReview } from "../models";
import { BaseRepository, IBaseRepository } from "./base.repository";

export interface IProductReviewRepository extends IBaseRepository<ProductReview> {}

/* @Service({ id: "productReview-repository"}) */
export class ProductReviewRepository extends BaseRepository<ProductReview>  implements IProductReviewRepository{
    constructor() {
        super(getRepository(ProductReview));
    }
} 