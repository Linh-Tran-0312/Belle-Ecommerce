import { IProductVariantUpdateProps } from "../controllers/productController";
import { HttpCode } from "../helpers/HttpCode";
import { OperationalError, OperationalErrorMessage } from "../helpers/OperationalError";
import { IProductVariantCreateProps, IProductVariant } from "../models";
import { ProductVariantRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";


//@Service({ id: "OrderRepository-service"})
export class ProductVariantService extends BaseService<IProductVariant, ProductVariantRepository> implements IBaseService<IProductVariant>  {
    constructor() {
        super(new ProductVariantRepository())
    }
    public async createProductVariant(data: IProductVariantCreateProps): Promise<IProductVariant> {
        const { id } = await this.repository.create(data);
        const newProductVariant: IProductVariant |null = await this.repository.findOne({
            where: {
                id: id
            },
            relations: ["color","size"]
        });
        if(!newProductVariant) throw new OperationalError(OperationalErrorMessage.NOT_FOUND, HttpCode.NOT_FOUND);
        return newProductVariant;
    }

    public async updateProductVariant(id: number, data: IProductVariantUpdateProps ): Promise<IProductVariant> {
        await this.repository.update(id, data);
        const updatedProductVariant: IProductVariant|null = await this.repository.findOne({
            where: {
                id: id
            },
            relations: ["color","size"]
        });
         if(!updatedProductVariant) throw new OperationalError(OperationalErrorMessage.NOT_FOUND, HttpCode.NOT_FOUND);
        return updatedProductVariant;
    }
}