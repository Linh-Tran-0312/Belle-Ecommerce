import { getRepository } from "typeorm";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { ProductVariant, IProductVariant, IProductVariantCreateProps } from "../models";
import { Service } from "typedi";

export interface IProductVariantRepository extends IBaseRepository<ProductVariant> {}

@Service({ id: "productVariant-repository"})
export class ProductVariantRepository extends BaseRepository<ProductVariant> implements IProductVariantRepository {
    constructor() {
        super(getRepository(ProductVariant));
    }
} 