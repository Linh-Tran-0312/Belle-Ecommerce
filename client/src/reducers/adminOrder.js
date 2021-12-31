import produce from "immer";
import {ACTION} from "../constants";

const initState = {
    orders: [],
    order: {},
    total: 0,
    error: "",
    loading: false,
    detailLoading: false,
}
export default (state = initState, { type, payload}) => produce(state, (draft) => {
    switch(type) {
        case ACTION.GET_ORDERS:
            draft.orders = payload.orders;
            draft.total = payload.total;
            draft.loading = false;
            break;
        case ACTION.GET_ORDER_BY_ID:
            draft.order = payload;
            draft.detailLoading = false;
            break;
        case ACTION.UPDATE_ORDER_STATUS:
            draft.order = {...draft.order, status: payload.status, paymentMethod: payload.paymentMethod, paymentCheck: payload.paymentCheck};
            const i = draft.orders.findIndex(o => o.id == draft.order.id);
            draft.orders[i] = draft.order;
            draft.loading = false;
            break;
        case ACTION.ORDER_LOADING:
            draft.loading = payload;
            break;
        case ACTION.GET_ORDER_DETAIL_LOADING:
            draft.detailLoading = payload;
            break;
        default:
            break;
    }
})