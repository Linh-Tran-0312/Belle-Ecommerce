import api from "../api";
import { ACTION } from "../constants";
const blogActions = {

    getBlogCategories: () => async(dispatch) => {
        try {
//dispatch({ type: ACTION.GET_BLOG_CATEGORIES_START });
            const res = await api.getBlogCategories();
            console.log(res.data);
            dispatch({ type: ACTION.GET_BLOG_CATEGORIES, payload: res.data});
        } catch (error) {
            console.log(error);
            dispatch({ type: ACTION.ERROR_BLOG_CATEGORY, payload: error.message})
        }
    },
    createBlogCategory: (formData) => async(dispatch) => {
        try {
            const { data } = await api.createBlogCategory(formData);
            console.log(data);
            dispatch({ type: ACTION.CREATE_BLOG_CATEGORY, payload: data});
        } catch (error) {
            dispatch({ type: ACTION.ERROR_BLOG_CATEGORY, payload: error.message})
        }
    },
    updateBlogCategory: (id, formData) => async(dispatch) => {
        try {
            const { data } = await api.updateBlogCategory(id, formData);
            console.log(data);
            dispatch({ type: ACTION.UPDATE_BLOG_CATEGORY, payload: data});
        } catch (error) {
            dispatch({ type: ACTION.ERROR_BLOG_CATEGORY, payload: error.message})
        }
    },
    deleteBlogCategory: (id) => async(dispatch) => {
        try {
            dispatch({ type: ACTION.IS_DELETING_BLOG_CATEGORY})
            await api.deleteBlogCategory(id);          
            dispatch({ type: ACTION.DELETE_BLOG_CATEGORY, payload: id});
        } catch (error) {
            dispatch({ type: ACTION.ERROR_BLOG_CATEGORY, payload: error.message})
        }
    }

}

export default blogActions;