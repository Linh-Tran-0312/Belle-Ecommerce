import api from "../api";
import { ACTION, Query, MSG, SnackBar } from "../constants";
import handleFilter from "../helper/handleFilter";
import { enqueueSnackbar } from "./notification";
import errorHandler from "../helper/errorHandler";
const reportActions = {
    getOverviewReport: () => async(dispatch) => {
        try {   
            dispatch({type: ACTION.REPORT_LOADING, payload: true});       
            const { data } = await api.getOverviewReport();
            dispatch({ type: ACTION.GET_OVERVIEW_REPORT, payload: data})
        } catch (error) {
            dispatch({type: ACTION.REPORT_LOADING, payload: false});       
            errorHandler(error, dispatch)
        }
       
    },
    getSalesReport: (time) => async(dispatch) => {
        try {
            dispatch({type: ACTION.REPORT_LOADING, payload: true});       
            const { data } = await api.getSalesReport(time);
            dispatch({ type: ACTION.GET_SALES_REPORT, payload: data});
        } catch (error) {
            dispatch({type: ACTION.REPORT_LOADING, payload: false});       
            errorHandler(error, dispatch)
        }
    },
    getOrderReport: (time) => async(dispatch) => {
        try {
            dispatch({type: ACTION.REPORT_LOADING, payload: true});       
            const { data } = await api.getOrderReport(time);
            dispatch({ type: ACTION.GET_ORDER_REPORT, payload: data});
        } catch (error) {
            dispatch({type: ACTION.REPORT_LOADING, payload: false});       
            errorHandler(error, dispatch)
        }
    },
    getTopProductReport: (time, query) => async(dispatch) => {
        try {
            const queryStr = handleFilter(query);
            dispatch({type: ACTION.REPORT_LOADING, payload: true});       
            const { data } = await api.getProductReport(time,queryStr);
            dispatch({ type: ACTION.GET_TOP_PRODUCT_REPORT, payload: data});
        } catch (error) {
            dispatch({type: ACTION.REPORT_LOADING, payload: false});       
            errorHandler(error, dispatch)
        }
    },
    getTodayReport: () => async(dispatch) => {
        try {
            dispatch({type: ACTION.REPORT_LOADING, payload: true});       
            const { data } = await api.getSalesReport("today");
            dispatch({ type: ACTION.GET_TODAY_SALES_REPORT, payload: data});
        } catch (error) {
            dispatch({type: ACTION.REPORT_LOADING, payload: false});       
            errorHandler(error, dispatch)
        }
    }


}

export default reportActions