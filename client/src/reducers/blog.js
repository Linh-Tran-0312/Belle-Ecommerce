import produce from "immer";
import {ACTION} from "../constants";
import { EditorState, convertToRaw } from "draft-js";

const initBlog = {
    id: "",
    title: "",
    categoryId: "",
    imgPath: "",
    content: JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent())),
    commentAllow: true
}
const initState = {
    isDeletingBlogCategory: false,
    isDeletingBlog: false,
    categories: [],
    blogs: [],
    pagination: {
        total: 5
    },
    blog: initBlog,
    error: null,
}

export default (state = initState, {type, payload}) => produce(state, (draft) => {
    switch(type) {
        // reducer for blog category
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
        case ACTION.ERROR: 
            draft.error = payload;   
            break;
        // reducer for blog
        case ACTION.GET_BLOGS:
            draft.blogs = payload.blogs;
            draft.pagination.total = payload.total;
            return draft;
        case ACTION.GET_BLOG_BY_ID:
            draft.blog = payload
            return draft;
        case ACTION.INIT_BLOG:
            draft.blog = initBlog;
            return draft;
        case ACTION.CREATE_BLOG: 
            draft.blog = payload;
            draft.blogs.unshift(payload);
            draft.blogs.pop();
            draft.pagination.total = draft.pagination.total + 1;
            return draft;
        case ACTION.UPDATE_BLOG:
            draft.blog = payload;
            draft.blogs = draft.blogs.map(b => b.id === payload.id ? payload : b)
            return draft;
        case ACTION.IS_DELETING_BLOG:
            draft.isDeletingBlog = true;
            return draft;
        case ACTION.DELETE_BLOG:
            draft.blogs = draft.blogs.filter(b => b !== payload);
            draft.pagination.total = draft.pagination.total - 1;
            draft.isDeletingBlog = false;
            return draft;
        default:
            break;
    }
})