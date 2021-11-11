import  api from "../api";
import handleFilter from "../helper/handleFilter";
import { ACTION } from "../constants";
const blogActions = {
    getBlogs: (filter) => async(dispatch) => {
        try {
            let queryString = "";
            queryString = handleFilter(filter);
            const { data } = await api.getBlogs(queryString);
            dispatch({ type: ACTION.BLOG_LIST, payload: data})
        } catch (error) {
            console.log(error)
        }
    },
    getBlogById: (id) => async(dispatch) => {
        try {
         
            const { data } = await api.getBlogById(id);
            dispatch({ type: ACTION.BLOG, payload: data})
        } catch (error) {
            console.log(error)
        }
    }
}

export default blogActions;