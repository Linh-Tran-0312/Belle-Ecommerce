import { IProduct } from "../models";
import { ProductRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";


//@Service({ id: "OrderRepository-service"})
export class ProductService extends BaseService<IProduct, ProductRepository> implements IBaseService<IProduct>  {
    constructor() {
        super(new ProductRepository())
    }
}