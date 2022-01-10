
export class ValidateReviewModel {

    title?: string;
    text?: string;
    /**
     * @isInt Product id must be an integer
     * @minimum 0 Product id value must be at least 0
     */
    productId: number;
    /**
     * @isInt Rating must be an integer
     * @minimum 1 Min rating must be 1
     * @maximum 5 Max rating must be 5
     */
    rating: number;
    /**
     * @isInt User id must be an integer
     * @minimum 0 User id value must be at least 0
     */
    userId: number;

    constructor(productId: number, rating: number, userId: number, title: string, text: string) {
        this.productId = productId;
        this.rating = rating;
        this.userId = userId;
        this.title = title;
        this.text = text;
    }
}