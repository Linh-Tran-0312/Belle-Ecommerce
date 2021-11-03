import produce from "immer";
import {ACTION} from "../constants";
import { EditorState } from "draft-js";

const initBlog = {
    id: "",
    title: "",
    categoryId: "",
    imgPath: "",
    content: EditorState.createEmpty(),
    commentAllow: true
}
const initState = {
    isDeletingBlogCategory: false,
    categories: [],
    blogs: [],
    pagination: {
        total: 5,
        page: 1
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
            break;
        case ACTION.GET_BLOG_BY_ID:
            draft.blog = payload
            break;
        case ACTION.INIT_BLOG:
            draft.blog = initBlog;
            break;
        case ACTION.CREATE_BLOG: 
            draft.blog = payload;
            draft.blogs = draft.blogs.unshift(payload)
            break;
        case ACTION.UPDATE_BLOG:
            draft.blogs = draft.blogs.map(b => b.id === payload.id ? payload : b)
            break;
        case ACTION.DELETE_BLOG:
            draft.blogs = draft.blogs.filter(b => b !== payload)
            break;
        default:
            break;
    }
})