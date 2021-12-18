import produce from "immer";
import {ACTION} from "../constants";

const initState = {
    overview: {},
    salesReport: [],
    orderStatus: {},
    topProducts: [],
    error: "",
    loading: false
}
export default (state = initState, { type, payload}) => produce(state, (draft) => {
    switch(type) {
        case ACTION.GET_OVERVIEW_REPORT:
            draft.overview = payload;
            draft.error = "";
            draft.loading = false;
            break;
        case ACTION.GET_SALES_REPORT:
            draft.salesReport = payload;
            draft.loading = false;
            draft.error = "";
            break;
        case ACTION.GET_ORDER_REPORT:
            draft.orderStatus = payload;
            draft.loading = false;
            draft.error = "";
            break;
        case ACTION.REPORT_LOADING:
            draft.loading = true;
            break;
        default:
            break;
    }
})