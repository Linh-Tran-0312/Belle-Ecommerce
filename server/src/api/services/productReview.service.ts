import { LessThan } from "typeorm";
import { HttpCode } from "../helpers/HttpCode";
import { OperationalError, OperationalErrorMessage } from "../helpers/OperationalError";
import { IUserName, UserMapper } from "../mappers";
import { ProductReview, Status } from "../models";
import { IOrderDetailRepository, IProductReviewRepository, OrderDetailRepository, ProductReviewRepository } from "../repositories";
import { ValidateReviewModel } from "../validations";
import { BaseService, IBaseService } from "./base.service";

export interface IReviewCount {
    reviewCount: number,
    overallReview: number,
    details: number[] // details[0] -> number of oneStar, details[1] -> number of twoStart,...
}

export interface IReview {
    title: string;
    text: string;
    productId: number;
    rating: number;
    userId: number; 
    user: IUserName
}

/* export interface IReviewCreateProps {
    title?: string;
    text?: string;
    productId: number;
    rating: number;
    userId: number;
} */
export interface IReviewWithUser extends Omit<ProductReview, "user"> {
    user: IUserName
} 

export interface IReviewService extends IBaseService<ProductReview> {
    getReviewsByProductId(productId: number, size: number, cursor: number): Promise<IReview[]>;
    getReviewCountByProductId(productId: number): Promise<IReviewCount>;
    createReview(data:  ValidateReviewModel): Promise<IReview>
}
//@Service({ id: "OrderRepository-service"})
export class ProductReviewService extends BaseService<ProductReview, IProductReviewRepository> implements IReviewService {
    
    private orderDetailRepository: IOrderDetailRepository;

    constructor() {
        super(new ProductReviewRepository())
        this.orderDetailRepository = new OrderDetailRepository();
    }
    public async getReviewsByProductId(productId: number, size: number, cursor: number): Promise<IReview[]> {
        const options: any = {
            relations: ["user"],
            where: {productId},
            order: { id: "DESC"},
            take: size
        }
        if(cursor !== 0) options.where.id = LessThan(cursor);
        const reviews = await this.repository.find(options)
        reviews.forEach(review => {
            const user = UserMapper.toUserName(review.user!);
            review.user = user; 
        })
        return reviews
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

    public async createReview(data:  ValidateReviewModel): Promise<IReview> {
          
        // Check if this user has bought this product
        const isBought = await this.orderDetailRepository.findOne({
            relations: ["order","productVariant"],
            where: {
                order: {
                    userId: data.userId,
                    status: Status.COMPLETED
                }, 
                productVariant: {
                    productId: data.productId
                }
            }
        })
        if(!isBought) throw new OperationalError(OperationalErrorMessage.NO_REVIEW_PERMISSION, HttpCode.BAD_REQUEST);
        let existingReview: ProductReview|null = await this.repository.findOne({
            where: {
                productId: data.productId,
                userId: data.userId
            }
        })
        
        let review: ProductReview| null;
        if(!existingReview) {
            existingReview = await this.repository.create(data);
      
        } else {
            existingReview.title = data.title!;
            existingReview.text = data.text!;
            existingReview.rating = data.rating;
            await this.repository.create(existingReview)
        }
      
        review = await this.repository.findOne({
            relations: ["user"],
            where: {
                id: existingReview?.id
            }
        })
        if(!review) throw new OperationalError(OperationalErrorMessage.NOT_FOUND, HttpCode.BAD_REQUEST);
        const user = UserMapper.toUserName(review.user!);
       const result: IReview = {...review, user: user} 
              
        return result;
    }
}