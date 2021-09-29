 import { Service } from "typedi";
import { getRepository } from "typeorm";
import { IProduct, IProductCreateProps, Product } from "../models";
import { BaseRepository } from "./base.repository";

export interface IPagination {
    products: Product[],
    total: number,
}
@Service({ id: "product-repository"})
export class ProductRepository extends BaseRepository<IProduct, Product, IProductCreateProps>  {
    constructor() {
        super(getRepository(Product));
    }
    public async findAndCount(options: any): Promise<IPagination> {
        try {
            let products : Product[];
            let total: number;
            const [ result, count ] = await this.entity.findAndCount(options);
            products = result;
            total = count;
            console.log("Pro repo");
            return { products, total };
        } catch (error) {
           console.error();
           
            throw error
        }
       
    }
} 