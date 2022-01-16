import { Brand } from "../models";
import { BrandRepository,IBrandRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";
import { Service } from "typedi";

export interface IBrandName {
    name: string
}
export interface IBrandService extends IBaseService<Brand> {};

@Service()
export class BrandService extends BaseService<Brand, IBrandRepository> implements IBrandService  {
    constructor(
        brandRepository: BrandRepository
    ) {
        super(brandRepository)
    }
}