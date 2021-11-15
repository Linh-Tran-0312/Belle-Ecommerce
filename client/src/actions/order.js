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
    },

    createOrder: (formData) => async(dispatch) => {
        try {
            const { data } = await api.createOrder(formData);
            dispatch({ type: ACTION.UPDATE_ORDER, payload: data})
        } catch (error) {
            console.log(error)
        }
    },
    updateOrderItem: (id, formData) => async(dispatch) => {
        try {
            const { data } = await api.addItemToOrder(id, formData);
            dispatch({ type: ACTION.UPDATE_ORDER, payload: data})
        } catch (error) {
            console.log(error)
        }
    },
    deleteItem: (orderId, itemId) =>  async(dispatch) => {
        try {
             await api.deleteItem(itemId);
             const { data } = await api.getOrderById(orderId);
            dispatch({ type: ACTION.UPDATE_ORDER, payload: data})
        } catch (error) {
            console.log(error)
        };
    },
    updateItemQuantity: (orderId, itemId, formData) => async(dispatch) => {
        try {
            const res = await api.updateItemQuantity(itemId, formData);
            const { data } = await api.getOrderById(orderId);
            dispatch({ type: ACTION.UPDATE_ORDER, payload: data})
        } catch (error) {
            console.log(error)
        }
    },
    getCurrentOrder: (userId) => async(dispatch) => {
        try {
            const { data } = await api.getCurrentOrderByUserId(userId)
        } catch (error) {
            console.log(error);
        }
    },
    getOrderById: (orderId) => async(dispatch) => {
        try {
            const { data } = await api.getOrderById(orderId);
            dispatch({type: ACTION.USER_GET_ORDER_BY_ID, payload: data})
        } catch (error) {
            console.log(error);
        }
    },
    placeOrder: (orderId, formData, history) => async(dispatch) => {
        try {
            const {data} = await api.placeOrder(orderId, formData);
            dispatch({ type: ACTION.CLEAR_ORDER });
            history.push("/user")
        } catch (error) {
            console.log(error);
        }
    }


}

export default orderActions;
