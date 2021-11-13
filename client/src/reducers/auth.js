import produce from "immer";
import { ACTION } from "../constants";

const initState = {
    loading: false,
    error: "",
    isLogin: false,
    user: {},
    orders: []
}
export default (state = initState, { type, payload}) => produce(state, (draft) => {

    switch(type) {
        case ACTION.AUTH:
            localStorage.setItem("user",JSON.stringify(payload))
            draft.isLogin = true;
            draft.user = payload;
            draft.loading = false;
            draft.error = "";
            break;
        case ACTION.UPDATE_PROFILE: 
            localStorage.setItem("user",JSON.stringify(payload))
            draft.user = payload;
            draft.loading = false;
            draft.error = "";
            break;
        case ACTION.USER_ORDERS: 
        console.log(payload);
            draft.orders = payload;
            draft.loading = false;
            draft.error = "";
            break;
        case ACTION.LOGOUT:
            localStorage.clear();
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
