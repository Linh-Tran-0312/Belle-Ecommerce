import produce from "immer";
import {ACTION} from "../constants";
const initUser = {
    id: "",
    fname: "",
    lname: "",
    email: "",
    phone: "",
    email: "",
    address: "",
    role: ""
}
const initState = {
    users: [],
    user_message: "",
    user: initUser,
    total: 0,
    error: ""

}

export default (state=initState, { type, payload}) => produce(state, (draft) => {
    switch(type) {
        case ACTION.ERROR:
            draft.error = payload;
            break;
        case ACTION.GET_USERS:
            draft.users = payload.users;
            draft.total = payload.total;
            break;
        case ACTION.GET_USER_BY_ID:
            draft.user = payload;
            break;
        case ACTION.CREATE_USER:
            draft.user = payload;
            draft.user.sale = 0;
            draft.users.unshift(payload);
            draft.total = draft.total + 1;
            draft.user_message = ""
            break;
        case ACTION.UPDATE_USER:
            draft.user = payload;
            draft.user.sale = draft.user.orders.filter(o => o.status === "COMPLETED").reduce((preOrder, order) => { return preOrder + order.total }, 0 );
            draft.users = draft.users.map(u => u.id === payload.id ? payload : u );
            break;
        case ACTION.USER_MESSAGE:
            draft.user_message = payload;
            break;
        default:
            break;


    }
}) 

