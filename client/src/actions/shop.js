import { ACTION, Query } from "../constants";
import  api from "../api";
import handleFilter from "../helper/handleFilter";
const shopActions = {
    getProducts: (filter) => async(dispatch) => {
        try {
            let queryString = "";
            queryString = handleFilter(filter);
            if(filter.min !== 0 && filter.min !== "") queryString += `&min=${filter.min}`;
            if(filter.max !== 10000000 && filter.max !== "") queryString += `&max=${filter.max}`;
            switch(filter.sortMethod) {
                case "1":
                    queryString += `&sort=price&change=${Query.ASC}`;
                    break;
                case "2":
                    queryString += `&sort=price&change=${Query.DESC}`;
                    break;
                case "3":
                    queryString += `&sort=name&change=${Query.ASC}`;
                    break;
                case "4":
                    queryString += `&sort=name&change=${Query.DESC}`;
                    break;
                default:
                    break;
            }
            const { data } = await api.getProducts(queryString);
            dispatch({ type: ACTION.PRODUCT_LIST, payload: data})
        } catch (error) {
            console.log(error)
        }
    }
}

export default shopActions;