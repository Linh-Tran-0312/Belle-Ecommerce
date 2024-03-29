import produce from "immer";
import { ACTION } from "../constants"; 

const initState = {
    blogs: [],
    blog: {},
    total: 0
}

export default (state = initState, { type, payload}) => produce(state, (draft) => {
    switch(type) {
        case ACTION.BLOG_LIST: 
            draft.blogs = payload.blogs;
            draft.total = payload.total;
            break;
        case ACTION.BLOG:
            draft.blog = payload;
            break;
        default:
            break;
    }
})