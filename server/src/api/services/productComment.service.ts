import { ProductComment } from "../models";
import { ProductCommentRepository,IProductCommentRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";
import { Service } from "typedi";

export interface IProductCommentService extends IBaseService<ProductComment> {}

@Service()
export class ProductCommentService extends BaseService<ProductComment, IProductCommentRepository> implements IProductCommentService  {
    constructor(
        productCommentRepository: ProductCommentRepository
    ) {
        super(productCommentRepository)
    }
}