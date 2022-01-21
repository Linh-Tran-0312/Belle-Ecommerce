import produce from "immer";
import { ACTION } from "../constants";

const initState = {
    loading: false,
    profileLoading: true,
    profileError: "",
    error: "",
    admin: {},
}
export default (state = initState, { type, payload}) => produce(state, (draft) => {

    switch(type) {
        case ACTION.ADMIN_INIT:
            draft.admin= payload;
            draft.profileLoading = false;
            break;
        case ACTION.ADMIN_AUTH: 
        if(payload?.id) {
            draft.admin = payload;
        } 
            draft.error =  "";
            draft.loading = false;
          break;
        case ACTION.ADMIN_LOGOUT: 
            draft.admin = {};
            draft.error =  "";
            draft.loading = false;
            break;
        case ACTION.ADMIN_AUTH_LOADING: 
            draft.error =  "";
           draft.loading = payload;
           break;
        case ACTION.ADMIN_PROFILE_LOADING: 
            draft.error =  "";
            draft.profileLoading = payload;
            break;
        case ACTION.ADMIN_AUTH_ERROR:
            draft.loading = false;
            draft.error = payload;
            break;
        default:
            break;
    }
})
