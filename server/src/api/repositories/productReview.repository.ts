import { getRepository } from "typeorm";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { IProductReviewCreateProps, ProductReview, IProductReview } from "../models";
import { Service } from "typedi";

@Service({ id: "productReview-repository"})
export class ProductReviewRepository extends BaseRepository<IProductReview, ProductReview, IProductReviewCreateProps>  {
    constructor() {
        super(getRepository(ProductReview));
    }
} 