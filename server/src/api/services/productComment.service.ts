import { ProductComment } from "../models";
import { ProductCommentRepository,IProductCommentRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";

export interface IProductCommentService extends IBaseService<ProductComment> {}

//@Service({ id: "OrderRepository-service"})
export class ProductCommentService extends BaseService<ProductComment, IProductCommentRepository> implements IProductCommentService  {
    constructor() {
        super(new ProductCommentRepository())
    }
}