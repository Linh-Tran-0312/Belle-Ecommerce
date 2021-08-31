import { BasicProduct } from "./product.interface";
import { BasicUser } from "./user.interface";

export interface ProductComment {
    id: string,
    productId: BasicProduct,
    userId: BasicUser,
    text: string,
    parentId: string
}