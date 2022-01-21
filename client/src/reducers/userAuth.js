import produce from "immer";
import { ACTION } from "../constants";

const initState = {
    loading: false,
    profileLoading: true,
    error: "",
    user: {},
    orders: [],
}
export default (state = initState, { type, payload}) => produce(state, (draft) => {

    switch(type) {
        case ACTION.USER_INIT:
            draft.user = payload;
            draft.loading = false;
            draft.profileLoading = false;
            break;
        case ACTION.USER_AUTH:
        if(payload?.id) {
            localStorage.setItem("user",JSON.stringify(payload.id))
            draft.user = payload;          
            draft.error = "";
        }    
        break;
        case ACTION.UPDATE_PROFILE: 
        if(payload?.id) {
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
            draft.user = {};
            draft.orders = [];
            break;
        case ACTION.USER_AUTH_LOADING: 
           draft.loading = payload;
           break;
        case ACTION.USER_PROFILE_LOADING:
            draft.profileLoading = payload;
            break; 
        case ACTION.USER_AUTH_ERROR:
            draft.loading = false;
            draft.error = payload;
            break;
        default:
            break;
    }
})
