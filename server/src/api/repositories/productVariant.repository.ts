import { Service } from "typedi";
import { getRepository } from "typeorm";
import { ProductVariant } from "../models";
import { BaseRepository, IBaseRepository } from "./base.repository";

export interface IProductVariantRepository extends IBaseRepository<ProductVariant> {}

@Service({ id: "productVariant-repository"})
export class ProductVariantRepository extends BaseRepository<ProductVariant> implements IProductVariantRepository {
    constructor() {
        super(getRepository(ProductVariant));
    }
} 