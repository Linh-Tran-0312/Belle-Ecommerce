
import { IVariantInfo, ProductMapper } from "../mappers";
import { ProductVariant } from "../models";
import { IProductVariantRepository, ProductVariantRepository } from "../repositories";
import { ValidateVariantCreateModel, ValidateVariantUpdateModel } from "../validations";
import { BaseService, IBaseService } from "./base.service";
import { Service } from "typedi";

export interface IProductVariantService extends IBaseService<ProductVariant> {
    createProductVariant(data: ValidateVariantCreateModel): Promise<IVariantInfo>;
    updateProductVariant(id: number, data:ValidateVariantUpdateModel ): Promise<IVariantInfo>
};

@Service()
export class ProductVariantService extends BaseService<ProductVariant, IProductVariantRepository> implements IProductVariantService  {
    constructor(
        productVariantRepo: ProductVariantRepository
    ) {
        super(productVariantRepo)
    }

    public async getVariantById(id: number): Promise<IVariantInfo> {
        const variant: ProductVariant = await this.getOneById(id, ["color","size"]);
        return ProductMapper.toVariantInfo(variant)
    }
    public async createProductVariant(data: ValidateVariantCreateModel): Promise<IVariantInfo> {
        const { id } = await this.repository.create(data);
        return await this.getVariantById(id);
    }

    public async updateProductVariant(id: number, data: ValidateVariantUpdateModel ): Promise<IVariantInfo> {
        await this.repository.update(id, data);
        return await this.getVariantById(id);
    }
}