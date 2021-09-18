import { getRepository } from "typeorm";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { ProductReview } from "../models";
import { Service } from "typedi";

@Service({ id: "productReview-repository"})
export class ProductReviewRepository extends BaseRepository<ProductReview> implements IBaseRepository<ProductReview> {
    constructor() {
        super(getRepository(ProductReview));
    }
}