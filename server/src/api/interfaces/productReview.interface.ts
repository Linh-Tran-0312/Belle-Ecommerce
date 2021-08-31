import { BasicProduct } from "./product.interface";
import { BasicUser } from "./user.interface";

export interface ProductReview {
    id: string,
    userId: BasicUser,
    productId: BasicProduct,
    rating: number,
    title: string,
    text: string
}