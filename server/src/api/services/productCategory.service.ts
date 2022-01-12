import { ProductCategory } from "../models";
import { ProductCategoryRepository,IProductCategoryRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";

export interface IProductCategoryService extends IBaseService<ProductCategory> {}
    
//@Service({ id: "OrderRepository-service"})
export class ProductCategoryService extends BaseService<ProductCategory, IProductCategoryRepository> implements IProductCategoryService  {
    constructor() {
        super(new ProductCategoryRepository())
    }
}