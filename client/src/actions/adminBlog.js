import api from "../api";
import { ACTION, Query, MSG, SnackBar } from "../constants";
import handleFilter from "../helper/handleFilter";
import { enqueueSnackbar } from "./notification";
const blogActions = {

    // handle blog category actions
    getBlogCategories: () => async(dispatch) => {
        try {
            dispatch({ type: ACTION.BLOG_CATEGORY_LOADING });
            const res = await api.getBlogCategories();
            dispatch({ type: ACTION.GET_BLOG_CATEGORIES, payload: res.data});
        } catch (error) {
            if(error.response) {
                dispatch({ type: ACTION.BLOG_CATEGORY_ERROR, payload: error.response.data?.message})
            } else {
                console.log(error);
                dispatch({ type: ACTION.BLOG_CATEGORY_ERROR, payload: MSG.STH_WRONG})
            }     
        }
    },
    createBlogCategory: (formData) => async(dispatch) => {
        try {
            dispatch({ type: ACTION.BLOG_CATEGORY_LOADING });
            const { data } = await api.createBlogCategory(formData);
            dispatch(enqueueSnackbar(MSG.C_BLOG_CATEGORY, SnackBar.SUCCESS ));
            dispatch({ type: ACTION.CREATE_BLOG_CATEGORY, payload: data});
        } catch (error) {
            if(error.response) {
                //dispatch({ type: ACTION.BLOG_CATEGORY_ERROR, payload: error.response.data?.message});
                dispatch(enqueueSnackbar(error.response.data?.message, SnackBar.ERROR ));
            } else {
                console.log(error);
                //dispatch({ type: ACTION.BLOG_CATEGORY_ERROR, payload: MSG.STH_WRONG})
                dispatch(enqueueSnackbar(MSG.STH_WRONG, SnackBar.ERROR ));

            }  
        }
    },
    updateBlogCategory: (id, formData) => async(dispatch) => {
        try {
            dispatch({ type: ACTION.BLOG_CATEGORY_LOADING });
            const { data } = await api.updateBlogCategory(id, formData);
            dispatch(enqueueSnackbar(MSG.U_BLOG_CATEGORY, SnackBar.SUCCESS ));
            dispatch({ type: ACTION.UPDATE_BLOG_CATEGORY, payload: data});
        } catch (error) {
            if(error.response) {
                //dispatch({ type: ACTION.BLOG_CATEGORY_ERROR, payload: error.response.data?.message})
                dispatch(enqueueSnackbar(error.response.data?.message, SnackBar.ERROR ));
            } else {
                console.log(error);
               // dispatch({ type: ACTION.BLOG_CATEGORY_ERROR, payload: MSG.STH_WRONG})
               dispatch(enqueueSnackbar(MSG.STH_WRONG, SnackBar.ERROR ));
            } 
        }
    },
    deleteBlogCategory: (id) => async(dispatch) => {
        try {
            dispatch({ type: ACTION.BLOG_CATEGORY_LOADING });
            await api.deleteBlogCategory(id);          
            dispatch({ type: ACTION.DELETE_BLOG_CATEGORY, payload: id});
        } catch (error) {
            if(error.response) {
                dispatch({ type: ACTION.BLOG_CATEGORY_ERROR, payload: error.response.data?.message})
            } else {
                console.log(error);
                dispatch({ type: ACTION.BLOG_CATEGORY_ERROR, payload: MSG.STH_WRONG})
            } 
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
            dispatch({ type: ACTION.BLOG_LOADING });
            const res = await api.getBlogs(queryString);
            dispatch({ type: ACTION.GET_BLOGS, payload: res.data});
        } catch (error) {
            if(error.response) {
                dispatch({ type: ACTION.BLOG_ERROR, payload: error.response.data?.message})
            } else {
                console.log(error);
                dispatch({ type: ACTION.BLOG_ERROR, payload: MSG.STH_WRONG})
            } 
        }
    },
    getBlogById: (id) => async(dispatch) => {
        try {
            dispatch({ type: ACTION.BLOG_LOADING });
            const res = await api.getBlogById(id);
            dispatch({ type: ACTION.GET_BLOG_BY_ID, payload: res.data});
        } catch (error) {
            if(error.response) {
                dispatch({ type: ACTION.BLOG_ERROR, payload: error.response.data?.message})
            } else {
                console.log(error);
                dispatch({ type: ACTION.BLOG_ERROR, payload: MSG.STH_WRONG})
            }
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
            dispatch({ type: ACTION.BLOG_LOADING });
            const res = await api.createBlog(copy);   
            dispatch(enqueueSnackbar(MSG.C_BLOG, SnackBar.SUCCESS ));        
            dispatch({ type: ACTION.CREATE_BLOG, payload: res.data});
        } catch (error) {
            if(error.response) {
                //dispatch({ type: ACTION.BLOG_ERROR, payload: error.response.data?.message})
                dispatch(enqueueSnackbar(error.response.data?.message, SnackBar.ERROR ));      
            } else {
                console.log(error);
               // dispatch({ type: ACTION.BLOG_ERROR, payload: MSG.STH_WRONG})
               dispatch(enqueueSnackbar(MSG.STH_WRONG, SnackBar.ERROR ));    
            }
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
            dispatch({ type: ACTION.BLOG_LOADING });
            const res = await api.updateBlog(id,copy);
            dispatch(enqueueSnackbar(MSG.U_BLOG, SnackBar.SUCCESS ));
            dispatch({ type: ACTION.UPDATE_BLOG, payload: res.data});
        } catch (error) {
            if(error.response) {
                //dispatch({ type: ACTION.BLOG_ERROR, payload: error.response.data?.message})
                dispatch(enqueueSnackbar(error.response.data?.message, SnackBar.ERROR ));      
            } else {
                console.log(error);
               // dispatch({ type: ACTION.BLOG_ERROR, payload: MSG.STH_WRONG})
               dispatch(enqueueSnackbar(MSG.STH_WRONG, SnackBar.ERROR ));    
            }
        }
    },
    deleteBlog: (id) => async(dispatch) => {
        try {
            dispatch({ type: ACTION.IS_DELETING_BLOG})
            await api.deleteBlog(id);            
            dispatch({ type: ACTION.DELETE_BLOG, payload: id});
        } catch (error) {
            if(error.response) {
                dispatch({ type: ACTION.BLOG_ERROR, payload: error.response.data?.message})
            } else {
                console.log(error);
                dispatch({ type: ACTION.BLOG_ERROR, payload: MSG.STH_WRONG})
            }
        }
    }

}

export default blogActions;