import api from "../api";
import { ACTION, MSG } from "../constants";
const adminAuthActions = {
    login: (history, formData) => async(dispatch) => {
        try {
            dispatch({ type: ACTION.ADMIN_AUTH_LOADING, payload: true });
            const { data } = await api.adminLogin(formData);
            dispatch({ type: ACTION.ADMIN_AUTH, payload: data });
            history.push("/admin")
        } catch (error) {
            dispatch({ type: ACTION.ADMIN_AUTH_LOADING, payload: false });
            if(error.response) {
                dispatch({type: ACTION.ADMIN_AUTH_ERROR, payload: error.response.data.message})
            } else {
                dispatch({type: ACTION.ADMIN_AUTH_ERROR, payload: MSG.STH_WRONG})
                console.log(error)
            }
          
        }
    },
    logout: (history) => async(dispatch) => {
        try {
            await api.logout();
            dispatch({ type: ACTION.ADMIN_LOGOUT});
            history.push("/admin/login")
        } catch (error) {
            dispatch({type: ACTION.ADMIN_AUTH_ERROR, payload: MSG.STH_WRONG})
            console.log(error)
        }
    },
    getProfile: () => async(dispatch) => {
        try {
            const { data } = await api.getAdminProfile();
            dispatch({type: ACTION.ADMIN_INIT, payload: data})
        } catch (error) {
            
        }
    }
}
export default adminAuthActions