import api from "../api";
import { ACTION } from "../constants";

const authActions = {
    register: (formData, history) => async(dispatch) => {
        try {
            if(formData.password !== formData.confirm_password)
            {
                dispatch({ type: ACTION.AUTH_ERROR, payload: "Confirm password and password not match"})
            } else {
                dispatch({ type: ACTION.AUTH_LOADING})
                delete formData.confirm_password;
                const { data } = await api.register(formData);
                dispatch({ type: ACTION.AUTH, payload: data})
                history.push("/user");
            }       
        } catch (error) {
            if(error.response) {
                dispatch({ type: ACTION.AUTH_ERROR, payload: error.response.data.message})
            } else {
                dispatch({ type: ACTION.AUTH_ERROR, payload: error.message})
            }
        }
    },
    login: (formData, history) => async(dispatch) => {
        try {
            dispatch({ type: ACTION.AUTH_LOADING})
            delete formData.confirm_password;      
            const userRes= await api.login(formData);
            dispatch({ type: ACTION.AUTH, payload: userRes.data});
            const orderRes = await api.getCurrentOrderByUserId(userRes.data.id);
            console.log(orderRes.data);
            dispatch({ type: ACTION.GET_ORDER_AFTER_LOGIN, payload: orderRes.data})
            history.push("/user");
        } catch (error) {
            if(error.response) {
                dispatch({ type: ACTION.AUTH_ERROR, payload: error.response.data.message})
            } else {
                dispatch({ type: ACTION.AUTH_ERROR, payload: error.message})
            }
        }
    },
  
    logout: (history) => async(dispatch) => {
         dispatch({type: ACTION.LOGOUT})
         history.push("/");
    },
    updateProfile: (userId, formData) => async(dispatch) => {
        try {
            dispatch({ type: ACTION.AUTH_LOADING})
            delete formData.id;
            delete formData.createdAt;
            console.log(formData);
            const { data } = await api.updateUser(userId, formData);
            dispatch({ type: ACTION.UPDATE_PROFILE, payload: data});
        } catch (error) {
            if(error.response) {
                dispatch({ type: ACTION.AUTH_ERROR, payload: error.response.data.message})
            } else {
                dispatch({ type: ACTION.AUTH_ERROR, payload: error.message})
            }
        }
    },
    getOrdersByUserId: (userId) => async(dispatch) => {
        try {
            const { data } = await api.getOrdersByUserId(userId);
            dispatch({type: ACTION.USER_ORDERS, payload: data})
        } catch (error) {
            if(error.response) {
                dispatch({ type: ACTION.AUTH_ERROR, payload: error.response.data.message})
            } else {
                dispatch({ type: ACTION.AUTH_ERROR, payload: error.message})
            }
        }
    }
}

export default authActions