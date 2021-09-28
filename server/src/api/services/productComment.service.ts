import { IProductComment } from "../models";
import { ProductCommentRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";


//@Service({ id: "OrderRepository-service"})
export class ProductCommentService extends BaseService<IProductComment, ProductCommentRepository> implements IBaseService<IProductComment>  {
    constructor() {
        super(new ProductCommentRepository())
    }
}