import api from "../api";
import { ACTION, MSG } from "../constants";

const authActions = {
    register: (formData, history) => async(dispatch) => {
        try {
            if(formData.password !== formData.confirm_password)
            {
                dispatch({ type: ACTION.USER_AUTH_ERROR, payload: MSG.CF_PASS})
            } else {
                dispatch({ type: ACTION.USER_AUTH_LOADING})
                delete formData.confirm_password;
                const { data } = await api.register(formData);
                dispatch({ type: ACTION.USER_AUTH, payload: data})
                history.push("/user");
            }       
        } catch (error) {
            if(error.response) {
                dispatch({ type: ACTION.USER_AUTH_ERROR, payload: error.response?.data?.message})
            } else {
                console.log(error)
                dispatch({ type: ACTION.USER_AUTH_ERROR, payload: MSG.STH_WRONG})
            }
        }
    },
    login: (formData, history) => async(dispatch) => {
        try {
            dispatch({ type: ACTION.USER_AUTH_LOADING})
            delete formData.confirm_password;      
            const userRes= await api.login(formData);
            dispatch({ type: ACTION.USER_AUTH, payload: userRes.data});
            const orderRes = await api.getCurrentOrderByUserId(userRes.data.id);
            dispatch({ type: ACTION.GET_ORDER_AFTER_LOGIN, payload: orderRes.data})
            history.push("/user");
        } catch (error) {
            if(error.response) {
                dispatch({ type: ACTION.USER_AUTH_ERROR, payload: error.response?.data?.message})
            } else {
                console.log(error)
                dispatch({ type: ACTION.USER_AUTH_ERROR, payload: MSG.STH_WRONG})
            }
        }
    },
  
    logout: (history) => async(dispatch) => {
         dispatch({type: ACTION.USER_LOGOUT})
         dispatch({type: ACTION.CLEAR_ORDER});
         history.push("/");
    },
    updateProfile: (userId, formData) => async(dispatch) => {
        try {
            dispatch({ type: ACTION.USER_PROFILE_LOADING})
            delete formData.id;
            delete formData.createdAt;
            console.log(formData);
            const { data } = await api.updateUser(userId, formData);
            dispatch({ type: ACTION.UPDATE_PROFILE, payload: data});
        } catch (error) {
            if(error.response) {
                dispatch({ type: ACTION.USER_PROFILE_ERROR, payload: error.response?.data?.message})
            } else {
                dispatch({ type:ACTION.USER_PROFILE_ERROR, payload: MSG.STH_WRONG})
            }
        }
    },
    getOrdersByUserId: (userId) => async(dispatch) => {
        try {
            const { data } = await api.getOrdersByUserId(userId);
            dispatch({type: ACTION.USER_ORDERS, payload: data})
        } catch (error) {
            if(error.response) {
                dispatch({ type: ACTION.USER_AUTH_ERROR, payload: error.response.data.message})
            } else {
                dispatch({ type: ACTION.USER_AUTH_ERROR, payload: error.message})
            }
        }
    }
}

export default authActions