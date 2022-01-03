import produce from "immer";
import { ACTION } from "../constants";

const initState = {
    loading: false,
    error: "",
    isLogin: false,
    user: {},
    orders: [],
}
export default (state = initState, { type, payload}) => produce(state, (draft) => {

    switch(type) {
        case ACTION.USER_INIT:
            draft.user = payload;
            break;
        case ACTION.USER_AUTH:
        if(payload?.id) {
            localStorage.setItem("user",JSON.stringify(payload))
            draft.isLogin = true;
            draft.user = payload;          
            draft.error = "";
        }    
        break;
        case ACTION.UPDATE_PROFILE: 
        if(payload?.id) {
            localStorage.setItem("user",JSON.stringify(payload))
            draft.user = payload;
            draft.loading = false;
            draft.error = "";
        }
            break;
        case ACTION.USER_ORDERS: 
            draft.orders = payload;
            draft.loading = false;
            draft.error = "";
            break;
        case ACTION.USER_LOGOUT:
            localStorage.removeItem("user");
            draft.isLogin = false;
            draft.user = {};
            draft.orders = [];
            break;
        case ACTION.USER_AUTH_LOADING: 
           draft.loading = payload;
           break;
        case ACTION.USER_AUTH_ERROR:
            draft.loading = false;
            draft.error = payload;
            break;
        case ACTION.CLEAR_PROFILE_LOCAL:
            localStorage.removeItem("user");
            localStorage.removeItem("admin");
            break;
        default:
            break;
    }
})
