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
    blogCategoryLoading: false,
    blogCategoryError: "",
    blogLoading: false,
    blogError: "",
    categories: [],
    blogs: [],
    blogCount: 0,
    blog: initBlog,
}

export default (state = initState, {type, payload}) => produce(state, (draft) => {
    switch(type) {
        // reducer for blog category
        case ACTION.GET_BLOG_CATEGORIES:
            draft.categories = payload;
            draft.blogCategoryLoading = false;
            draft.blogCategoryError = "";  
            break;
        case ACTION.CREATE_BLOG_CATEGORY: 
            draft.categories.push(payload);
            draft.blogCategoryLoading = false;
            draft.blogCategoryError = "";     
            break;
        case ACTION.UPDATE_BLOG_CATEGORY: 
            draft.categories = draft.categories.map(c => c.id === payload.id ? payload : c);
            draft.blogCategoryLoading = false;
            draft.blogCategoryError = ""; 
            break;
        case ACTION.BLOG_CATEGORY_LOADING: 
            draft.blogCategoryLoading = payload;
            break;
        case ACTION.DELETE_BLOG_CATEGORY:
            draft.categories = draft.categories.filter(c => c.id !== payload );
            draft.blogCategoryLoading = false;
            draft.blogCategoryError = "";    
            break;

        // reducer for blog
        case ACTION.GET_BLOGS:
            draft.blogs = payload.blogs;
            draft.blogCount = payload.total;
            draft.blogLoading = false;
            draft.blogError = ""; 
            return draft;
        case ACTION.GET_BLOG_BY_ID:
            draft.blog = payload
            draft.blogLoading = false;
            draft.blogError = ""; 
            return draft;
        case ACTION.INIT_BLOG:
            draft.blog = initBlog;
            return draft;
        case ACTION.CREATE_BLOG: 
            draft.blog = payload;
            draft.blogs.unshift(payload);
            draft.blogs.pop();
            draft.blogCount = draft.blogCount + 1;
            draft.blogLoading = false;
            draft.blogError = ""; 
            return draft;
        case ACTION.UPDATE_BLOG:
            draft.blog = payload;
            draft.blogs = draft.blogs.map(b => b.id === payload.id ? payload : b);
            draft.blogLoading = false;
            draft.blogError = ""; 
            return draft;
        case ACTION.BLOG_LOADING:
            draft.blogLoading = payload;
            return draft;
        case ACTION.DELETE_BLOG:
            draft.blogs = draft.blogs.filter(b => b.id !== payload);
            draft.blogCount = draft.blogCount - 1;
            draft.blogLoading = false;
            draft.blogError = ""; 
            return draft;
        default:
            break;
    }
})