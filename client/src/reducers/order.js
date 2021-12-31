import produce from "immer";
import { ACTION } from "../constants";

const initState = {
    orderId: "",
    items: [],
    subTotal: 0,
    order: {},
    loading: false,
    detailLoading: false,
    orderSuccess: false
}
export default (state = initState, { type, payload}) => produce(state, (draft) => {
    switch(type) {
        case ACTION.ADD_ITEM: 
              const indexAdd =  draft.items.findIndex(i => i.productVariant.id === payload.productVariant.id);
              if(indexAdd !== -1) 
              {
                    draft.items[indexAdd].quantity += payload.quantity;
              } else {
                draft.items.push(payload)
              }
          draft.subTotal = draft.subTotal + payload.quantity*payload.unitPrice
            break;
        case ACTION.DELETE_ITEM:
              const indexDel = draft.items.findIndex(i => i.productVariant.id == payload);
              draft.subTotal = draft.subTotal - draft.items[indexDel].unitPrice*draft.items[indexDel].quantity;
              draft.items = draft.items.filter(i => i.productVariant.id !== payload)
            break;
        case ACTION.UPDATE_ITEM_QUANTITY: 
                draft.items = draft.items.map(i => {
                    if(i.productVariant.id === payload.productVariantId) {
                          i.quantity = payload.quantity;
                         return i;
                    } else return i;
                })
            draft.subTotal = draft.items.reduce(((preValue,curValue) => preValue + curValue.unitPrice*curValue.quantity),0);
                break;
            case ACTION.GET_ORDER_AFTER_LOGIN:
            if(payload) {
                draft.orderId = payload.id;
                draft.items = payload.details;
                draft.subTotal = payload.details?.reduce(((preValue,curValue) => preValue + curValue.unitPrice*curValue.quantity),0);
            }
            break;
        case ACTION.UPDATE_ORDER:
            if(payload) {
                draft.orderId = payload.id;
                draft.items = payload.details;
                draft.subTotal = payload.details?.reduce(((preValue,curValue) => preValue + curValue.unitPrice*curValue.quantity),0);
            }
            break;
        case ACTION.CLEAR_ORDER: 
            draft.orderId = "";
            draft.items = [];
            draft.subTotal = 0;
            draft.orderSuccess = false;
            break;
        case ACTION.USER_GET_ORDER_BY_ID:
            draft.order = payload;
            draft.detailLoading = false;
            break;
        case ACTION.USER_ORDER_LOADING: 
            draft.loading = true;
            break;
        case ACTION.USER_GET_ORDER_DETAIL_LOADING:
            draft.detailLoading = payload;
            break;
        case ACTION.PLACE_ORDER_SUCCESS:
            draft.loading = false;
            draft.orderSuccess = true;
            break;
        case ACTION.PLACE_ORDER_IDLE:
            draft.orderSuccess = false;
            break;
        default:
            break;
    }
})