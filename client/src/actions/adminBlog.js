import api from "../api";
import { ACTION, Query, MSG, SnackBar } from "../constants";
import handleFilter from "../helper/handleFilter";
import { enqueueSnackbar } from "./notification";
import errorHandler from "../common/errorHandler";

const blogActions = {

    // handle blog category actions
    getBlogCategories: () => async(dispatch) => {
        try {
            dispatch({ type: ACTION.BLOG_CATEGORY_LOADING, payload: true });
            const res = await api.getBlogCategories();
            dispatch({ type: ACTION.GET_BLOG_CATEGORIES, payload: res.data});
        } catch (error) {
            dispatch({ type: ACTION.BLOG_CATEGORY_LOADING, payload: false});
            errorHandler(error,dispatch)    
        }
    },
    createBlogCategory: (formData) => async(dispatch) => {
        try {
            dispatch({ type: ACTION.BLOG_CATEGORY_LOADING, payload: true });
            const { data } = await api.createBlogCategory(formData);
            dispatch(enqueueSnackbar(MSG.C_BLOG_CATEGORY, SnackBar.SUCCESS ));
            dispatch({ type: ACTION.CREATE_BLOG_CATEGORY, payload: data});
        } catch (error) {
            dispatch({ type: ACTION.BLOG_CATEGORY_LOADING, payload: false});
             errorHandler(error,dispatch)
        }
    },
    updateBlogCategory: (id, formData) => async(dispatch) => {
        try {
            dispatch({ type: ACTION.BLOG_CATEGORY_LOADING, payload: true });
            const { data } = await api.updateBlogCategory(id, formData);
            dispatch(enqueueSnackbar(MSG.U_BLOG_CATEGORY, SnackBar.SUCCESS ));
            dispatch({ type: ACTION.UPDATE_BLOG_CATEGORY, payload: data});
        } catch (error) {
            dispatch({ type: ACTION.BLOG_CATEGORY_LOADING, payload: false});
            errorHandler(error,dispatch)
        }
    },
    deleteBlogCategory: (id) => async(dispatch) => {
        try {
            dispatch({ type: ACTION.BLOG_CATEGORY_LOADING, payload: true });
            await api.deleteBlogCategory(id); 
            dispatch(enqueueSnackbar(MSG.D_BLOG_CATEGORY, SnackBar.ERROR ));
            dispatch({ type: ACTION.DELETE_BLOG_CATEGORY, payload: id});
        } catch (error) {
            dispatch({ type: ACTION.BLOG_CATEGORY_LOADING, payload: false});
            errorHandler(error,dispatch)
        }
    },

    // handle blog actions
    getBlogs: (filter) => async(dispatch) => {
        try {
            let queryString = "";
            queryString = handleFilter(filter);
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
            dispatch({ type: ACTION.BLOG_LOADING, payload: true });
            const res = await api.getBlogs(queryString);
            dispatch({ type: ACTION.GET_BLOGS, payload: res.data});
        } catch (error) {
            dispatch({ type: ACTION.BLOG_LOADING, payload: false});
            errorHandler(error,dispatch)
        }
    },
    getBlogById: (id) => async(dispatch) => {
        try {
            dispatch({ type: ACTION.BLOG_LOADING, payload: true });
            const res = await api.getBlogById(id);
            dispatch({ type: ACTION.GET_BLOG_BY_ID, payload: res.data});
        } catch (error) {
            dispatch({ type: ACTION.BLOG_LOADING, payload: false});
            errorHandler(error,dispatch)
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
            dispatch({ type: ACTION.BLOG_LOADING, payload: true });
            const res = await api.createBlog(copy);   
            dispatch(enqueueSnackbar(MSG.C_BLOG, SnackBar.SUCCESS ));        
            dispatch({ type: ACTION.CREATE_BLOG, payload: res.data});
        } catch (error) {
            dispatch({ type: ACTION.BLOG_LOADING, payload: false});
            errorHandler(error,dispatch)
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
            dispatch({ type: ACTION.BLOG_LOADING, payload: true });
            const res = await api.updateBlog(id,copy);
            dispatch(enqueueSnackbar(MSG.U_BLOG, SnackBar.SUCCESS ));
            dispatch({ type: ACTION.UPDATE_BLOG, payload: res.data});
        } catch (error) {
            dispatch({ type: ACTION.BLOG_LOADING, payload: false});
            errorHandler(error,dispatch) 
        }
    },
    deleteBlog: (id) => async(dispatch) => {
        try {
            dispatch({ type: ACTION.BLOG_LOADING, payload: true });
            await api.deleteBlog(id);            
            dispatch({ type: ACTION.DELETE_BLOG, payload: id});
        } catch (error) {
            dispatch({ type: ACTION.BLOG_LOADING, payload: false});
            errorHandler(error,dispatch)
        }
    }

}

export default blogActions;