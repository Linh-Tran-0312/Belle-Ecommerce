/* import { getRepository } from "typeorm";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { ProductVariant } from "../models";
import { Service } from "typedi";

@Service({ id: "productVariant-repository"})
export class ProductVariantRepository extends BaseRepository<ProductVariant> implements IBaseRepository<ProductVariant> {
    constructor() {
        super(getRepository(ProductVariant));
    }
} */