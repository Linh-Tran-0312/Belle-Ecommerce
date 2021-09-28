import { IBrand } from "../models";
import { BrandRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";


//@Service({ id: "OrderRepository-service"})
export class BrandService extends BaseService<IBrand, BrandRepository> implements IBaseService<IBrand>  {
    constructor() {
        super(new BrandRepository())
    }
}