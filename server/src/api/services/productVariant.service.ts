
import { IProductVariant, IProductVariantCreateProps, ProductVariant } from "../models";
import { ProductVariantRepository,IProductVariantRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";
import { ProductMapper, IVariantInfo } from "../mappers";
export interface IProductVariantUpdateProps {
    colorId?: number;
    sizeId?: number;
    quantity?: number;
}
export interface IProductVariantService extends IBaseService<ProductVariant> {
    createProductVariant(data: IProductVariantCreateProps): Promise<IVariantInfo>;
    updateProductVariant(id: number, data: IProductVariantUpdateProps ): Promise<IVariantInfo>
}
//@Service({ id: "OrderRepository-service"})
export class ProductVariantService extends BaseService<ProductVariant, IProductVariantRepository> implements IProductVariantService  {
    constructor() {
        super(new ProductVariantRepository())
    }

    public async getVariantById(id: number): Promise<IVariantInfo> {
        const variant: ProductVariant = await this.getOneById(id, ["color","size"]);
        return ProductMapper.toVariantInfo(variant)
    }
    public async createProductVariant(data: IProductVariantCreateProps): Promise<IVariantInfo> {
        const { id } = await this.repository.create(data);
        return await this.getVariantById(id);
    }

    public async updateProductVariant(id: number, data: IProductVariantUpdateProps ): Promise<IVariantInfo> {
        await this.repository.update(id, data);
        return await this.getVariantById(id);
    }
}