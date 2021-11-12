import { ACTION, Query } from "../constants";
import  api from "../api";
import handleFilter from "../helper/handleFilter";
import handleAddItem from "../helper/handleAddItem";
const isLogin = false;
const orderActions = {
    addItemToCart: (product, { productVariantId, quantity}) => async(dispatch) => {
        if(isLogin) {

        }
        else {
            const newItem = handleAddItem(product, {  productVariantId, quantity })
            dispatch({ type: ACTION.ADD_ITEM, payload: newItem})
        }
    },
    deleteItemFromCart: (productVariantId) => async(dispatch) => {
            if(isLogin) {

        }
        else {
            dispatch({ type: ACTION.DELETE_ITEM, payload: productVariantId})
        }
    },
    updateItemQuantity: (item) => async(dispatch) => {
            if(isLogin) {

        }
        else {
            dispatch({ type: ACTION.UPDATE_ITEM_QUANTITY, payload: item})
        }
    }

}

export default orderActions;
