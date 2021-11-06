import api from "../api";
import { ACTION, Query } from "../constants";
const blogActions = {

    // handle blog category actions
    getBlogCategories: () => async(dispatch) => {
        try {
            const res = await api.getBlogCategories();
            console.log(res.data);
            dispatch({ type: ACTION.GET_BLOG_CATEGORIES, payload: res.data});
        } catch (error) {
            console.log(error);
            dispatch({ type: ACTION.ERROR, payload: error.message})
        }
    },
    createBlogCategory: (formData) => async(dispatch) => {
        try {
            const { data } = await api.createBlogCategory(formData);
            console.log(data);
            dispatch({ type: ACTION.CREATE_BLOG_CATEGORY, payload: data});
        } catch (error) {
            dispatch({ type: ACTION.ERROR, payload: error.message})
        }
    },
    updateBlogCategory: (id, formData) => async(dispatch) => {
        try {
            const { data } = await api.updateBlogCategory(id, formData);
            console.log(data);
            dispatch({ type: ACTION.UPDATE_BLOG_CATEGORY, payload: data});
        } catch (error) {
            dispatch({ type: ACTION.ERROR, payload: error.message})
        }
    },
    deleteBlogCategory: (id) => async(dispatch) => {
        try {
            dispatch({ type: ACTION.IS_DELETING_BLOG_CATEGORY})
            await api.deleteBlogCategory(id);          
            dispatch({ type: ACTION.DELETE_BLOG_CATEGORY, payload: id});
        } catch (error) {
            dispatch({ type: ACTION.ERROR, payload: error.message})
        }
    },

    // handle blog actions
    getBlogs: (filter) => async(dispatch) => {
        try {
            let queryString = "";
            if(filter.category) queryString += `category=${filter.category}`;
            if(filter.search) queryString += `&search=${filter.search}`;
            if(filter.limit) queryString += `&limit=${filter.limit}`;
            if(filter.page) queryString += `&page=${filter.page}`;
            switch(filter.sortMethod) {
                case "1":
                    queryString += `&sort=createdAt&change=${Query.ASC}`;
                    break;
                case "2":
                    queryString += `&sort=createdAt&change=${Query.DESC}`;
                    break;
                case "3":
                    queryString += `&sort=title&change=${Query.ASC}`;
                    break;
                case "4":
                    queryString += `&sort=title&change=${Query.DESC}`;
                    break;
                default:
                    break;
            }
            const res = await api.getBlogs(queryString);
            console.log(res.data);
            dispatch({ type: ACTION.GET_BLOGS, payload: res.data});
        } catch (error) {
            console.log(error);
            dispatch({ type: ACTION.ERROR, payload: error.message})
        }
    },
    getBlogById: (id) => async(dispatch) => {
        try {
            const res = await api.getBlogById(id);
            console.log(res.data);
            dispatch({ type: ACTION.GET_BLOG_BY_ID, payload: res.data});
        } catch (error) {
            console.log(error);
            dispatch({ type: ACTION.ERROR, payload: error.message})
        }
    },
    createBlog: (formData) => async(dispatch) => {
        try {
            const copy = {
                title: formData.title,
                imgPath: formData.imgPath,
                categoryId: formData.categoryId,
                commentAllow: formData.commentAllow,
                content: formData.content
            }; 
            console.log(copy);
            const res = await api.createBlog(copy);
            
            dispatch({ type: ACTION.CREATE_BLOG, payload: res.data});
        } catch (error) {
            console.log(error);
            dispatch({ type: ACTION.ERROR, payload: error.message})
        }
    },
    updateBlog: (id,formData) => async(dispatch) => {
        try {
            const copy = {
                title: formData.title,
                imgPath: formData.imgPath,
                categoryId: formData.categoryId,
                commentAllow: formData.commentAllow,
                content: formData.content
            }; 
           
            console.log(copy);
            const res = await api.updateBlog(id,copy);
            console.log(res.data);
            dispatch({ type: ACTION.UPDATE_BLOG, payload: res.data});
        } catch (error) {
            console.log(error);
            dispatch({ type: ACTION.ERROR, payload: error.message})
        }
    },
    deleteBlog: (id) => async(dispatch) => {
        try {
            dispatch({ type: ACTION.IS_DELETING_BLOG})
            await api.deleteBlog(id);            
            dispatch({ type: ACTION.DELETE_BLOG, payload: id});
        } catch (error) {
            console.log(error);
            dispatch({ type: ACTION.ERROR, payload: error.message})
        }
    }

}

export default blogActions;