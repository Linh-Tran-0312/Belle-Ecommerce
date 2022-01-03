import api from "../api";
import { ACTION, MSG } from "../constants";
const adminAuthActions = {
    login: (history, formData) => async(dispatch) => {
        try {
            dispatch({ type: ACTION.ADMIN_AUTH_LOADING });
            const { data } = await api.adminLogin(formData);
            dispatch({ type: ACTION.ADMIN_AUTH, payload: data });
            history.push("/admin")
        } catch (error) {
            if(error.response) {
                console.log( error.response.data.message)
                dispatch({type: ACTION.ADMIN_AUTH_ERROR, payload: error.response.data.message})
            } else {
                dispatch({type: ACTION.ADMIN_AUTH_ERROR, payload: MSG.STH_WRONG})
                console.log(error)
            }
          
        }
    },
    logout: (history) => async(dispatch) => {
        try {
            dispatch({ type: ACTION.ADMIN_LOGOUT});
            history.push("/admin/login")
        } catch (error) {
            dispatch({type: ACTION.ADMIN_AUTH_ERROR, payload: MSG.STH_WRONG})
            console.log(error)
        }
    }
}
export default adminAuthActions