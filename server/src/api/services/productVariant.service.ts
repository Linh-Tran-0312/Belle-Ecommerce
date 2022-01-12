
import { IProductVariant, IProductVariantCreateProps, ProductVariant } from "../models";
import { ProductVariantRepository,IProductVariantRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";

export interface IProductVariantUpdateProps {
    colorId?: number;
    sizeId?: number;
    quantity?: number;
}
export interface IProductVariantService extends IBaseService<ProductVariant> {
    createProductVariant(data: IProductVariantCreateProps): Promise<ProductVariant>;
    updateProductVariant(id: number, data: IProductVariantUpdateProps ): Promise<ProductVariant>
}
//@Service({ id: "OrderRepository-service"})
export class ProductVariantService extends BaseService<ProductVariant, IProductVariantRepository> implements IProductVariantService  {
    constructor() {
        super(new ProductVariantRepository())
    }
    public async createProductVariant(data: IProductVariantCreateProps): Promise<ProductVariant> {
        const { id } = await this.repository.create(data);
        const newProductVariant: ProductVariant = await this.getOneById(id, ["color","size"]);
        return newProductVariant;
    }

    public async updateProductVariant(id: number, data: IProductVariantUpdateProps ): Promise<ProductVariant> {
        await this.repository.update(id, data);
        const updatedProductVariant: ProductVariant = await this.getOneById(id, ["color","size"]);
        return updatedProductVariant;
    }
}