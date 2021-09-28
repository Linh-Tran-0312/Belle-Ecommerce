import { IProductReview, ProductReview } from "../models";
import { ProductReviewRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";


//@Service({ id: "OrderRepository-service"})
export class ProductReviewService extends BaseService<IProductReview, ProductReviewRepository> implements IBaseService<IProductReview>  {
    constructor() {
        super(new ProductReviewRepository())
    }
}