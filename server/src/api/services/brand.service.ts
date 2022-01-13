import { Brand } from "../models";
import { BrandRepository,IBrandRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";

export interface IBrandName {
    name: string
}
export interface IBrandService extends IBaseService<Brand> {};

//@Service({ id: "OrderRepository-service"})
export class BrandService extends BaseService<Brand, IBrandRepository> implements IBrandService  {
    constructor() {
        super(new BrandRepository())
    }
}