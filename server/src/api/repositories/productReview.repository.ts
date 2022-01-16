import { getRepository } from "typeorm";
import { ProductReview } from "../models";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { Service } from "typedi";

export interface IProductReviewRepository extends IBaseRepository<ProductReview> {}

@Service()
export class ProductReviewRepository extends BaseRepository<ProductReview>  implements IProductReviewRepository{
    constructor() {
        super(getRepository(ProductReview));
    }
} 