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
        case ACTION.UPDATE_ORDER_STATUS:
            draft.order = {...draft.order, status: payload.status, paymentMethod: payload.paymentMethod, paymentCheck: payload.paymentCheck};
            const i = draft.orders.findIndex(o => o.id == draft.order.id);
            draft.orders[i] = draft.order;
            break;
        default:
            break;
    }
})