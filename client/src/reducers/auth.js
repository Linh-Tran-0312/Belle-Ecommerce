import produce from "immer";
import { ACTION } from "../constants";

const initState = {
    loading: false,
    error: "",
    isLogin: false,
    user: {},
    orders: [],
    admin: {},
    adminMessage: ""
}
export default (state = initState, { type, payload}) => produce(state, (draft) => {

    switch(type) {
        case ACTION.USER_INIT:
            draft.user = payload;
            break;
        case ACTION.ADMIN_INIT:
            draft.admin= payload;
            break;
        case ACTION.ADMIN_MESSAGE:
            draft.adminMessage = payload;
            break;
        case ACTION.ADMIN_AUTH: 
        if(payload?.id) {
            localStorage.setItem("admin",JSON.stringify(payload))
            draft.admin = payload;
            draft.adminMessage = "";
        } 
          
          break;
        case ACTION.ADMIN_LOGOUT: 
            draft.admin = {};
            localStorage.removeItem("admin");
        case ACTION.AUTH:
            if(payload?.id) {
                localStorage.setItem("user",JSON.stringify(payload))
                draft.isLogin = true;
                draft.user = payload;
                draft.loading = false;
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
        case ACTION.LOGOUT:
            localStorage.removeItem("user");
            draft.isLogin = false;
            draft.user = {};
            draft.orders = [];
            break;
        case ACTION.AUTH_LOADING: 
           draft.loading = true;
           break;
        case ACTION.AUTH_ERROR:
            draft.loading = false;
            draft.error = payload;
        default:
            break;
    }
})
