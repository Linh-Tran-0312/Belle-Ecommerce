import { IProductVariant } from "../models";
import { ProductVariantRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";


//@Service({ id: "OrderRepository-service"})
export class ProductVariantService extends BaseService<IProductVariant, ProductVariantRepository> implements IBaseService<IProductVariant>  {
    constructor() {
        super(new ProductVariantRepository())
    }
}