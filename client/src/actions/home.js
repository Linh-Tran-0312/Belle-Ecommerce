import { ACTION } from "../constants";
import  api from "../api";

const homeActions = {
    getProductCategories: () => async(dispatch) => {
        try {
            const { data } = await api.getProductCategories();
            dispatch({ type: ACTION.PRODUCT_CATEGORIES, payload: data})
        } catch (error) {
            console.log(error)
        }
    },
    getBlogCategories: () => async(dispatch) => {
        try {
            const { data } = await api.getBlogCategories();
            dispatch({ type: ACTION.BLOG_CATEGORIES, payload: data})
        } catch (error) {
            console.log(error)
        }
    },
    getProductBrands: () => async(dispatch) => {
        try {
            const { data } = await api.getProductBrands();
            dispatch({ type: ACTION.PRODUCT_BRANDS, payload: data})
        } catch (error) {
            console.log(error)
        }
    },
    getNewArrivals: () => async(dispatch) => {
        try {
            const queryString = "limit=8&page=1&sort=createdAt&change=DESC";
            const { data } = await api.getProducts(queryString);
            dispatch({ type: ACTION.NEW_ARRIVALS, payload: data.products})
        } catch (error) {
            console.log(error)
        }
    },
    getLatestBlogs: () => async(dispatch) => {
        try {
            const queryString = "limit=2&page=1&sort=createdAt&change=DESC"
            const { data } = await api.getBlogs(queryString);
            dispatch({ type: ACTION.LATEST_BLOGS, payload: data.blogs})
        } catch (error) {
            console.log(error)
        }
    }
}

export default homeActions;