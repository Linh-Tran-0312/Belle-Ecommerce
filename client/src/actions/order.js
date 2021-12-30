import { ACTION, Query, MSG, SnackBar } from "../constants";
import  api from "../api";
import handleFilter from "../helper/handleFilter";
import handleAddItem from "../helper/handleAddItem";
import { enqueueSnackbar } from "./notification";
import errorHandler from "../helper/errorHandler";
const orderActions = {
    addItemToCart: (product, { productVariantId, quantity}) => async(dispatch) => {
        const newItem = handleAddItem(product, {  productVariantId, quantity })
        dispatch({ type: ACTION.ADD_ITEM, payload: newItem});
        dispatch(enqueueSnackbar(MSG.ADD_PRODUCT_TO_CART, SnackBar.SUCCESS))
    },
    deleteItemFromCart: (productVariantId) => async(dispatch) => {
            dispatch({ type: ACTION.DELETE_ITEM, payload: productVariantId})
    },
    updateItemQuantity: (item) => async(dispatch) => {
            dispatch({ type: ACTION.UPDATE_ITEM_QUANTITY, payload: item})
    },
    createOrder: (formData) => async(dispatch) => {
        try {
            const { data } = await api.createOrder(formData);
            dispatch({ type: ACTION.UPDATE_ORDER, payload: data});
            dispatch(enqueueSnackbar(MSG.ADD_PRODUCT_TO_CART, SnackBar.SUCCESS))

        } catch (error) {
            errorHandler(error,dispatch)
            console.log(error)
        }
    },
    updateOrderItem: (id, formData) => async(dispatch) => {
        try {
            const { data } = await api.addItemToOrder(id, formData);
            dispatch({ type: ACTION.UPDATE_ORDER, payload: data});
            dispatch(enqueueSnackbar(MSG.ADD_PRODUCT_TO_CART, SnackBar.SUCCESS))
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
            const { data } = await api.getCurrentOrderByUserId(userId);
            dispatch({ type: ACTION.GET_ORDER_AFTER_LOGIN, payload: data})
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
    placeOrder: (orderId, formData) => async(dispatch) => {
        try {
            dispatch({ type: ACTION.USER_ORDER_LOADING});
            const {data} = await api.placeOrder(orderId, formData);
            dispatch({ type: ACTION.PLACE_ORDER_SUCCESS})
     
        } catch (error) {
            console.log(error);
        }
    },
    clearOrder: () => async(dispatch) => {
        dispatch({ type: ACTION.CLEAR_ORDER });
    
    }
 

}

export default orderActions;
