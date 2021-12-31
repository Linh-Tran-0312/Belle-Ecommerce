import api from "../api";
import { ACTION, Query, MSG, SnackBar } from "../constants";
import handleFilter from "../helper/handleFilter";
import { enqueueSnackbar } from "./notification";
import errorHandler from "../helper/errorHandler";
const orderActions = {
    getOrders: (filter) => async(dispatch) => {
        try {
            let queryString = "";
            queryString = handleFilter(filter);
             
            switch(filter.sortMethod) {
                case "1":
                    queryString += `&sort=orderAt&change=${Query.ASC}`;
                    break;
                case "2":
                    queryString += `&sort=orderAt&change=${Query.DESC}`;
                    break;
                case "3":
                    queryString += `&sort=total&change=${Query.ASC}`;
                    break;
                case "4":
                    queryString += `&sort=total&change=${Query.DESC}`;
                    break;
                default:
                    break;
            }
            const { data } = await api.getOrders(queryString);
            dispatch({ type: ACTION.GET_ORDERS, payload: data})
        } catch (error) {
            errorHandler(error, dispatch)
        }
       
    },
    getOrderById: (id) => async(dispatch) => {
        try {
            dispatch({ type: ACTION.GET_ORDER_DETAIL_LOADING, payload: true})
            const { data } = await api.getOrderById(id);
            dispatch({ type: ACTION.GET_ORDER_BY_ID, payload: data});
        } catch (error) {
            dispatch({ type: ACTION.GET_ORDER_DETAIL_LOADING, payload: false})
            errorHandler(error, dispatch)
        }
    },
    updateOrderStatus: (id, formData) => async(dispatch) =>  {
        try {
            dispatch({ type: ACTION.ORDER_LOADING, payload: true})
            const { data } = await api.updateOrderStatus(id, formData);
            dispatch({ type: ACTION.UPDATE_ORDER_STATUS, payload: data})
            dispatch(enqueueSnackbar(MSG.U_ORDER, SnackBar.SUCCESS))
        } catch (error) {
            dispatch({ type: ACTION.ORDER_LOADING, payload: false})
            errorHandler(error, dispatch)
        }
    }

}

export default orderActions