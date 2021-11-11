import produce from "immer";
import { ACTION } from "../constants"; 

const initState = {
    products: [],
    product: {},
    total: 0
}

export default (state = initState, { type, payload}) => produce(state, (draft) => {
    switch(type) {
        case ACTION.PRODUCT_LIST: 
            draft.products = payload.products;
            draft.total = payload.total;
            break;
        case ACTION.PRODUCT:
            draft.product = payload;
            break;
        default:
            break;
    }
})