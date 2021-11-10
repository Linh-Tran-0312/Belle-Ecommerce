import api from "../api";
import { ACTION, Query } from "../constants";
import handleFilter from "../helper/handleFilter";

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
            console.log(error)
        }
       
    },
    getOrderById: (id) => async(dispatch) => {
        try {
            const { data } = await api.getOrderById(id);
            dispatch({ type: ACTION.GET_ORDER_BY_ID, payload: data});
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }

}

export default orderActions