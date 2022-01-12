import { Body, Controller, Get, Path, Post, Query, Route, Security, Tags } from "tsoa";
import { IProductReview, IProductReviewCreateProps, UserRole } from "../models";
import { IReviewCount, ProductReviewService } from "../services";
import { ValidateReviewModel } from "../validations";
import { IReview } from "../interfaces";
@Route("reviews")
@Tags('Product Review')
export class ReviewController  extends Controller {
    private _reviewService: ProductReviewService;

    constructor() {
        super()
        this._reviewService = new ProductReviewService();
    }

    /**
     * Get reviews by productId
    * @param {number} productId
    * @isInt productId Product id must be an integer
    * @minimum productId 0 Product id must be at least 0
     */
    @Get("/:productId")
    public async getReviewsByProductId(@Path() productId: number, @Query() size: number, @Query() cursor: number): Promise<IReview[]> {
        return this._reviewService.getReviewsByProductId(productId, size, cursor);
    }
    /**
     * Get reviews by productId
    * @param {number} productId
    * @isInt productId Product id must be an integer
    * @minimum productId 0 Product id must be at least 0
     */
    @Get("/:productId/count")
    public async getReviewCountByProductId(@Path() productId: number): Promise<IReviewCount> {
        return this._reviewService.getReviewCountByProductId(productId);
    }
    /**
     * Create new review
     */
    @Security("jwt", [UserRole.ADMIN, UserRole.EDITOR, UserRole.CUSTOMER])
    @Post("/")
    public async createReview(@Body() data: ValidateReviewModel): Promise<IReview> {
        return this._reviewService.createReview(data)
    }
     
}