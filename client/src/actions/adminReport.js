import api from "../api";
import { ACTION, Query, MSG, SnackBar } from "../constants";
import handleFilter from "../helper/handleFilter";
import { enqueueSnackbar } from "./notification";
import errorHandler from "../helper/errorHandler";
const reportActions = {
    getOverviewReport: () => async(dispatch) => {
        try {   
            dispatch({type: ACTION.REPORT_LOADING});       
            const { data } = await api.getOverviewReport();
            dispatch({ type: ACTION.GET_OVERVIEW_REPORT, payload: data})
        } catch (error) {
            errorHandler(error, dispatch)
        }
       
    },
    getSalesReport: (time) => async(dispatch) => {
        try {
            dispatch({type: ACTION.REPORT_LOADING});  
            const { data } = await api.getSalesReport(time);
            dispatch({ type: ACTION.GET_SALES_REPORT, payload: data});
        } catch (error) {
            errorHandler(error, dispatch)
        }
    },


}

export default reportActions