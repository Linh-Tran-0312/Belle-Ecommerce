import { getRepository } from "typeorm";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { ProductVariant, IProductVariant, IProductVariantCreateProps } from "../models";
import { Service } from "typedi";

@Service({ id: "productVariant-repository"})
export class ProductVariantRepository extends BaseRepository<IProductVariant, ProductVariant, IProductVariantCreateProps>  {
    constructor() {
        super(getRepository(ProductVariant));
    }
} 