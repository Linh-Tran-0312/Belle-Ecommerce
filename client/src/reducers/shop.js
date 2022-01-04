import produce from "immer";
import { ACTION } from "../constants"; 

const initState = {
    products: [],
    product: {},
    reviews: [],
    reviewCount: {
        reviewCount: 0,
        overallReview: 0,
        details: [0,0,0,0,0]
    },
    reviewLoading: false,
    total: 0
}

export default (state = initState, { type, payload}) => produce(state, (draft) => {
    switch(type) {
        case ACTION.PRODUCT_LIST: 
            draft.products = payload.products;
            draft.total = payload.total;
            break;
        case ACTION.PRODUCT:
            draft.product = payload;
            break;
        case ACTION.REVIEWS:
            draft.reviews = payload;
            draft.reviewLoading = false;
            break;
        case ACTION.MORE_REVIEWS:
            draft.reviews = draft.reviews.concat(payload);
            draft.reviewLoading = false;
            break;
        case ACTION.REVIEW_COUNT:
            draft.reviewCount = payload;
            draft.reviewCount?.details.reverse();
            draft.reviewLoading = false;
            break;
        case ACTION.REVIEW:
            if(payload) {
                const index = draft.reviews.findIndex(x => x.id === payload.id)
                if(index === - 1) {
                    draft.reviews.unshift(payload);
                    draft.reviewCount.overallReview = (draft.reviewCount.overallReview* draft.reviewCount.reviewCount + payload.rating)/(draft.reviewCount.reviewCount + 1)
                    draft.reviewCount.reviewCount = draft.reviewCount.reviewCount + 1;
                    draft.reviewCount.details[5 - payload.rating] = draft.reviewCount.details[5 - payload.rating] + 1
                } else {
                    draft.reviews[index] = payload;
                    draft.reviewCount.overallReview = (draft.reviewCount.overallReview* draft.reviewCount.reviewCount + payload.rating)/(draft.reviewCount.reviewCount + 1)
                    draft.reviewCount.reviewCount = draft.reviewCount.reviewCount + 1;
                    draft.reviewCount.details[5 - payload.rating] = draft.reviewCount.details[5 - payload.rating] + 1
                }
                
            
            } 
            draft.reviewLoading = false;
            break;
        case ACTION.REVIEW_LOADING:
            draft.reviewLoading = payload;
            break;
        default:
            break;
    }
})