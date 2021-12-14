 import { Service } from "typedi";
import { getRepository } from "typeorm";
import { IProduct, IProductCreateProps, Product } from "../models";
import { BaseRepository } from "./base.repository";
import { PostgresError } from "../helpers/PostgresError";
export interface IProducts {
    products: Product[],
    total: number,
}
@Service({ id: "product-repository"})
export class ProductRepository extends BaseRepository<IProduct, Product, IProductCreateProps>  {
    constructor() {
        super(getRepository(Product));
    }
    public async findAndCount(options: any): Promise<IProducts> {
        try {
            let result: IProducts = {
                products: [],
                total: 0
            };
            const [ products, count ] = await this.entity.findAndCount(options);
            result.products = products;
            result.total = count;
            return result;
        } catch (err: any) {
            throw new PostgresError(err.message, err);
        }
    }
} 