import { ACTION, Query, MSG, SnackBar } from "../constants";
import  api from "../api";
import handleFilter from "../helper/handleFilter";
import { enqueueSnackbar } from "./notification";
import errorHandler from "../helper/errorHandler";
const shopActions = {
    getProducts: (filter) => async(dispatch) => {
        try {
            let queryString = "";
            queryString = handleFilter(filter);
            if(filter.min !== 0 && filter.min !== "") queryString += `&min=${filter.min}`;
            if(filter.max !== 10000000 && filter.max !== "") queryString += `&max=${filter.max}`;
            switch(filter.sortMethod) {
                case "1":
                    queryString += `&sort=price&change=${Query.ASC}`;
                    break;
                case "2":
                    queryString += `&sort=price&change=${Query.DESC}`;
                    break;
                case "3":
                    queryString += `&sort=name&change=${Query.ASC}`;
                    break;
                case "4":
                    queryString += `&sort=name&change=${Query.DESC}`;
                    break;
                default:
                    break;
            }
            const { data } = await api.getProducts(queryString);
            dispatch({ type: ACTION.PRODUCT_LIST, payload: data})
        } catch (error) {
            console.log(error)
        }
    },
    getProductById: (id) => async(dispatch) => {
        try {
                const { data } = await api.getProductById(id);
                dispatch({ type: ACTION.PRODUCT, payload: data})
        } catch (error) {
                console.log(error)
        }
    },
    getProductReviews: (productId) => async(dispatch) => {
        try {
            dispatch({ type: ACTION.REVIEW_LOADING, payload: true})
            const { data } = await api.getReviewsByProductId(productId, 5, 0);
            dispatch({ type: ACTION.REVIEWS, payload: data})
        } catch (error) {
            dispatch({ type: ACTION.REVIEW_LOADING, payload: false})
            console.log(error)
        }
    },
    getMoreProductReviews: (productId, limit, cursor) => async(dispatch) => {
        try {
            dispatch({ type: ACTION.REVIEW_LOADING, payload: true})
            const { data } = await api.getReviewsByProductId(productId,  limit, cursor);
            dispatch({ type: ACTION.MORE_REVIEWS, payload: data})
        } catch (error) {
            dispatch({ type: ACTION.REVIEW_LOADING, payload: false})
            console.log(error)
        }
    },
    getReviewCount: (productId) => async(dispatch) => {
        try {
            const { data } = await api.getReviewCount(productId);
            dispatch({ type: ACTION.REVIEW_COUNT, payload: data})
        } catch (error) {
            console.log(error)
        }
    },
    createReview: (formData) => async(dispatch) => {
        try {
            dispatch({ type: ACTION.REVIEW_LOADING, payload: true})
            const { data } = await api.createReview(formData);

            dispatch(enqueueSnackbar(MSG.C_REVIEW, SnackBar.DEFAULT))
            dispatch({ type: ACTION.REVIEW, payload: data})
              
        } catch (error) {
            dispatch({ type: ACTION.REVIEW_LOADING, payload: false})
            errorHandler(error,dispatch)
        }
    },
}

export default shopActions;