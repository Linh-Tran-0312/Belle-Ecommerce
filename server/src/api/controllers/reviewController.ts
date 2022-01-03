import { Body, Delete, Get, Patch, Path, Post, Route, Tags, Security, Controller, Query} from "tsoa";
import { IProductReview, IProductReviewCreateProps } from "../models";
import { ProductReviewService } from "../services";
import { UserRole } from "../models";

export interface IReviewCount {
    reviewCount: number,
    overallReview: number,
    details: number[] // details[0] -> number of oneStar, details[1] -> number of twoStart,...
}

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
     */
    @Get("/:productId")
    public async getReviewsByProductId(@Path() productId: number, @Query() size: number, @Query() cursor: number): Promise<IProductReview[]> {
        return this._reviewService.getReviewsByProductId(productId, size, cursor);
    }
    /**
     * Get reviews by productId
     */
    @Get("/:productId/count")
    public async getReviewCountByProductId(@Path() productId: number): Promise<IReviewCount> {
        return this._reviewService.getReviewCountByProductId(productId);
    }
    /**
     * Create new color
     */
    @Security("jwt", [UserRole.ADMIN, UserRole.EDITOR, UserRole.CUSTOMER])
    @Post("/")
    public async createReview(@Body() data: IProductReviewCreateProps): Promise<IProductReview> {
        return this._reviewService.createReview(data)
    }
     
}