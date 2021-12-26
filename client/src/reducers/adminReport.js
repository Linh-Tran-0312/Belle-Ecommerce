import draftToHtml from "draftjs-to-html";
import produce from "immer";
import {ACTION} from "../constants";

const initState = {
    todayReport: [],
    todaySales: 0,
    overview: {},
    salesReport: [],
    orderReport: [
        { name: 'Canceled', value: 0},
        { name: 'Completed', value: 0},
    ],
    productReport: {
        total: 0,
        products: []
    },
    error: "",
    loading: false
}
export default (state = initState, { type, payload}) => produce(state, (draft) => {
    switch(type) {
        case ACTION.GET_TODAY_SALES_REPORT:
            draft.todayReport = payload;
            draft.todaySales = payload.reduce((preValue, currentItem) => preValue + currentItem.sales,0);
            draft.error = "";
            draft.loading = false;
            break;
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

            draft.orderReport =[
                { name: 'Canceled', value: payload.canceledOrders },
                { name: 'Completed', value: payload.completedOrders},
            ];
            draft.loading = false;
            draft.error = "";
            break;
        case ACTION.GET_TOP_PRODUCT_REPORT:
            draft.productReport.total = payload.total;
            draft.productReport.products = payload.products;
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