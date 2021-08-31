import { BasicProduct } from "./product.interface";
import { BasicSize } from "./size.interface";
import { BasicColor } from "./color.interface";

export interface BasicProductVariant {
    id: string
}

export interface ProductVariant extends BasicProductVariant {
    productId: BasicProduct,
    sizeId: BasicSize,
    color: BasicColor,
    quantity: number
}