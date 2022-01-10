
import { IProductVariant, IProductVariantCreateProps } from "../models";
import { ProductVariantRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";

export interface IProductVariantUpdateProps {
    colorId?: number;
    sizeId?: number;
    quantity?: number;
}
//@Service({ id: "OrderRepository-service"})
export class ProductVariantService extends BaseService<IProductVariant, ProductVariantRepository> implements IBaseService<IProductVariant>  {
    constructor() {
        super(new ProductVariantRepository())
    }
    public async createProductVariant(data: IProductVariantCreateProps): Promise<IProductVariant> {
        const { id } = await this.repository.create(data);
        const newProductVariant: IProductVariant = await this.getOneById(id, ["color","size"]);
        return newProductVariant;
    }

    public async updateProductVariant(id: number, data: IProductVariantUpdateProps ): Promise<IProductVariant> {
        await this.repository.update(id, data);
        const updatedProductVariant: IProductVariant = await this.getOneById(id, ["color","size"]);
        return updatedProductVariant;
    }
}