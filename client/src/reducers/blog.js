import produce from "immer";
import {ACTION} from "../constants";

const initState = {
    isDeletingBlogCategory: false,
    categories: [],
    blogs: [],
    error: null,
}

export default (state = initState, {type, payload}) => produce(state, (draft) => {
    switch(type) {
        case ACTION.GET_BLOG_CATEGORIES:
            draft.categories = payload;
            break;
        case ACTION.CREATE_BLOG_CATEGORY: 
            draft.categories.push(payload)     
            break;
        case ACTION.UPDATE_BLOG_CATEGORY: 
            draft.categories = draft.categories.map(c => c.id === payload.id ? payload : c)   
            break;
        case ACTION.IS_DELETING_BLOG_CATEGORY: 
        draft.isDeletingBlogCategory = true;  
        break;
        case ACTION.DELETE_BLOG_CATEGORY:
            draft.isDeletingBlogCategory = false;   
            draft.categories = draft.categories.filter(c => c.id !== payload )   
            break;
        case ACTION.ERROR_BLOG_CATEGORY: 
            draft.error = payload;   
        break;
        default:
            break;
    }
})