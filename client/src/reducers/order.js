import produce from "immer";
import {ACTION} from "../constants";

const initState = {
    orders: [],
    order: {},
    total: 0,
    error: ""
}
export default (state = initState, { type, payload}) => produce(state, (draft) => {
    switch(type) {
        case ACTION.GET_ORDERS:
            draft.orders = payload.orders;
            draft.total = payload.total;
            break;
        case ACTION.GET_ORDER_BY_ID:
            draft.order = payload;
            break;
        default:
            break;
    }
})