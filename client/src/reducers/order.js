import produce from "immer";
import { ACTION } from "../constants";

const initState = {
    isLoggined: false,
    orderId: "",
    items: [],
    subTotal: 0,
}
export default (state = initState, { type, payload}) => produce(state, (draft) => {
    switch(type) {
        case ACTION.ADD_ITEM: 
          if(draft.isLoggined){

          } else {
              
              const index =  draft.items.findIndex(i => i.productVariant.id === payload.productVariant.id);
            
              if(index !== -1)
              {
                    draft.items[index].quantity += payload.quantity;
              } else {
                draft.items.push(payload)
              }
             
          }
          draft.subTotal = draft.subTotal + payload.quantity*payload.unitPrice
            break;
        case ACTION.DELETE_ITEM:
            if(draft.isLoggined){

          } else {
            
              const index = draft.items.findIndex(i => i.productVariant.id == payload);
              draft.subTotal = draft.subTotal - draft.items[index].unitPrice*draft.items[index].quantity;
              draft.items = draft.items.filter(i => i.productVariant.id !== payload)
          }

            break;
        case ACTION.UPDATE_ITEM_QUANTITY: 
            if(draft.isLoggined)
            {

            } else {
                draft.items = draft.items.map(i => {
                    if(i.productVariant.id === payload.productVariantId) {
                          i.quantity = payload.quantity;
                         return i;
                    } else return i;
                })
            }
            draft.subTotal = draft.items.reduce(((preValue,curValue) => preValue + curValue.unitPrice*curValue.quantity),0);
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
        default:
            break;
    }
})