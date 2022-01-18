import api from "../api";
import { ACTION, MSG, SnackBar } from "../constants";
import { enqueueSnackbar } from "./notification";
import errorHandler, { handleValidationError} from "../helper/errorHandler";
const authActions = {
    register: (formData, history, prePath, items) => async(dispatch) => {
        try {
            if(formData.password !== formData.confirm_password)
            {
                dispatch({ type: ACTION.USER_AUTH_ERROR, payload: MSG.CF_PASS})
            } else {
                dispatch({ type: ACTION.USER_AUTH_LOADING, payload: true})
                delete formData.confirm_password;
                const { data } = await api.register(formData);
                dispatch({ type: ACTION.USER_AUTH, payload: data});
                let details = [];
                items.forEach(item => {
                    details.push({ productVariantId: item.productVariantId, unitPrice: item.unitPrice, quantity: item.quantity})
                })
                const orderRes = await api.updateOrderAfterLogin(data.id, { details });
                dispatch({ type: ACTION.GET_ORDER_AFTER_LOGIN, payload: orderRes.data}); 
                dispatch({ type: ACTION.USER_AUTH_LOADING, payload: false})
                history.push(prePath);
            }       
        } catch (error) {
            if(error.response) {
                if(error.response.data?.message === "Validation Failed") {
                    const msg = handleValidationError(error);
                    dispatch({ type: ACTION.USER_AUTH_ERROR, payload: msg})
                } else {
                    dispatch({ type: ACTION.USER_AUTH_ERROR, payload: error.response?.data?.message})
                }
            } else {
                console.log(error)
                dispatch({ type: ACTION.USER_AUTH_ERROR, payload: MSG.STH_WRONG})
            }
        }
    },
    login: (formData, history, prePath, items) => async(dispatch) => {
        try {
            dispatch({ type: ACTION.USER_AUTH_LOADING, payload: true})
            delete formData.confirm_password;      
            const userRes= await api.login(formData);
            dispatch({ type: ACTION.USER_AUTH, payload: userRes.data});
           let details = [];
           items.forEach(item => {
               details.push({ productVariantId: item.productVariantId, unitPrice: item.unitPrice, quantity: item.quantity})
           })
            const orderRes = await api.updateOrderAfterLogin(userRes.data.id, { details });
            dispatch({ type: ACTION.GET_ORDER_AFTER_LOGIN, payload: orderRes.data});
            dispatch({ type: ACTION.USER_AUTH_LOADING, payload: false})
            history.push(prePath);
        } catch (error) {
            if(error.response) {
                if(error.response.data?.message === "Validation Failed") {
                    const msg = handleValidationError(error);
                    dispatch({ type: ACTION.USER_AUTH_ERROR, payload: msg})
                } else {
                    dispatch({ type: ACTION.USER_AUTH_ERROR, payload: error.response?.data?.message})
                }
            } else {
                console.log(error)
                dispatch({ type: ACTION.USER_AUTH_ERROR, payload: MSG.STH_WRONG})
            }
        }
    },
  
    logout: (history) => async(dispatch) => {
        try {
            await api.logout();
            dispatch({type: ACTION.USER_LOGOUT})
            dispatch({type: ACTION.CLEAR_ORDER});
            history.push("/");
        } catch (error) {
            
        }
        
    },
    getProfile: () => async(dispatch) => {
        try {
            const { data } = await api.getUserProfile();
            dispatch({type: ACTION.USER_INIT, payload: data})
        } catch (error) {
            
        }
    },
    updateProfile: (userId, formData) => async(dispatch) => {
        try {
            dispatch({ type: ACTION.USER_PROFILE_LOADING})
            const { fname, lname, email, address, phone } = formData
            const { data } = await api.updateUser(userId, { fname, lname, email, address, phone });
            dispatch({ type: ACTION.UPDATE_PROFILE, payload: data});
            dispatch(enqueueSnackbar(MSG.U_PROFILE, SnackBar.SUCCESS))
        } catch (error) {
            errorHandler(error,dispatch)
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