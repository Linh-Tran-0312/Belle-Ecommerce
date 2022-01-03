import { IProductReview, IProductReviewCreateProps, ProductReview } from "../models";
import { ProductReviewRepository, OrderDetailRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";
import { LessThan } from "typeorm";
import { IReviewCount } from "../controllers/reviewController";
import { OperationalError, OperationalErrorMessage } from "../helpers/OperationalError";
import { HttpCode } from "../helpers/HttpCode";

//@Service({ id: "OrderRepository-service"})
export class ProductReviewService extends BaseService<IProductReview, ProductReviewRepository> implements IBaseService<IProductReview>  {
    private orderDetailRepository: OrderDetailRepository;
    constructor() {
        super(new ProductReviewRepository())
        this.orderDetailRepository = new OrderDetailRepository();
    }
    public async getReviewsByProductId(productId: number, size: number, cursor: number): Promise<IProductReview[]> {
        const options: any = {
            relations: ["user"],
            where: {productId},
            order: { id: "DESC"},
            take: size
        }
        if(cursor !== 0) options.where.id = LessThan(cursor);
        const result = await this.repository.find(options)
        result.forEach(review => {
            delete review?.user?.orders;
            delete review?.user?.address;
            delete review?.user?.email;
            delete review?.user?.password;
            delete review?.user?.phone;
            delete review?.user?.role;
            delete review?.user?.token;
        })
        return result
    }

    public async getReviewCountByProductId(productId: number): Promise<IReviewCount> {
        const result: IReviewCount = {
            overallReview: 0,
            reviewCount: 0,
            details: [0,0,0,0,0]
        }
        const reviews = await this.repository.find({
            select: ["rating"],
            where: {
                productId
            }
        });
        let totalRating = 0;
        reviews.forEach(review => {
            result.details[review.rating - 1] += 1;
            totalRating += review.rating;
        })
        result.reviewCount = reviews.length;
        result.overallReview =totalRating/reviews.length;
        return result;
    }

    public async createReview(data: IProductReviewCreateProps): Promise<IProductReview> {
          
        // Check if this user has bought this product
        const isBought = await this.orderDetailRepository.findOne({
            relations: ["order","productVariant"],
            where: {
                order: {
                    userId: data.userId,

                }, 
                productVariant: {
                    productId: data.productId
                }
            }
        })
        if(!isBought) throw new OperationalError(OperationalErrorMessage.NO_REVIEW_PERMISSION, HttpCode.BAD_REQUEST);
        let existingReview = await this.repository.findOne({
            where: {
                productId: data.productId,
                userId: data.userId
            }
        })
        
        let review: IProductReview|null;
        if(!existingReview) {
            existingReview = await this.repository.create(data);
      
        } else {
            existingReview.title = data.title;
            existingReview.text = data.text;
            existingReview.rating = data.rating;
            await this.repository.create(existingReview)
        }
      
        review = await this.repository.findOne({
            relations: ["user"],
            where: {
                id: existingReview.id
            }
        })
        if(!review) throw new OperationalError(OperationalErrorMessage.NOT_FOUND, HttpCode.BAD_REQUEST);

        delete review?.user?.orders;
        delete review?.user?.address;
        delete review?.user?.email;
        delete review?.user?.password;
        delete review?.user?.phone;
        delete review?.user?.role;
        delete review?.user?.token;
         
        return review;
    }
}