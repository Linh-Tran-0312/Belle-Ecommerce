import { IProductCategory } from "../models";
import { ProductCategoryRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";


//@Service({ id: "OrderRepository-service"})
export class ProductCategoryService extends BaseService<IProductCategory, ProductCategoryRepository> implements IBaseService<IProductCategory>  {
    constructor() {
        super(new ProductCategoryRepository())
    }
}