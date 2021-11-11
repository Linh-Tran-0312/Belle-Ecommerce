import produce from "immer";
import {ACTION} from "../constants";

const initState = {
    blogCategories: [],
    productCategories: [],
    productBrands: [],
    newArrivals: [],
    latestBlogs: []
}

export default (state = initState, { type, payload}) => produce(state, (draft) => {
    switch(type) {
        case ACTION.BLOG_CATEGORIES: 
            draft.blogCategories = payload;
            break;
        case ACTION.PRODUCT_CATEGORIES:
            draft.productCategories = payload;
            break;
        case ACTION.PRODUCT_BRANDS:
            draft.productBrands = payload;
            break;
        case ACTION.NEW_ARRIVALS:
            draft.newArrivals = payload;
            break;
        case ACTION.LATEST_BLOGS:
            draft.latestBlogs = payload;
            break;
        default:
            break;
    }
})