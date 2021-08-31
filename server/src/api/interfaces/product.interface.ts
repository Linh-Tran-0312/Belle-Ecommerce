import { BasicCategory } from "./category.interface";

export interface BasicProduct {
    id: number
}

export interface Product extends BasicProduct {
    name: string,
    summary: string,
    categoryId: BasicCategory,
    description: string,
    overallReview: number,
    reviewCount: number,
    imgPath: string,
    price: number,
    createdAt: string,
}