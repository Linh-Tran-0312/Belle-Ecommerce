import produce from "immer";
import { ACTION } from "../constants"; 

const initState = {
    products: [],
    product: {},
    reviews: [],
    reviewCount: {},
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
            draft.reviews = draft.reviews.concat(payload);
            draft.reviewLoading = false;
            break;
        case ACTION.REVIEW_COUNT:
            draft.reviewCount = payload;
            draft.reviewCount?.details.reverse();
            draft.reviewLoading = false;
            break;
        case ACTION.REVIEW: 
            draft.reviews.unshift(payload);
            draft.reviewLoading = false;
            break;
        case ACTION.REVIEW_LOADING:
            draft.reviewLoading = payload;
            break;
        default:
            break;
    }
})