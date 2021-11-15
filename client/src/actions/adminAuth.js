import api from "../api";
import { ACTION } from "../constants";
const adminAuthActions = {
    login: (history, formData) => async(dispatch) => {
        try {
            const { data } = await api.adminLogin(formData);
            dispatch({ type: ACTION.ADMIN_AUTH, payload: data });
            history.push("/admin")
        } catch (error) {
            if(error.response) {
                dispatch({type: ACTION.ADMIN_MESSAGE, payload: error.response.data.message})
            }
            console.log(error)
        }
    },
    logout: (history) => async(dispatch) => {
        try {
            dispatch({ type: ACTION.ADMIN_LOGOUT});
            history.push("/admin/login")
        } catch (error) {
            console.log(error)
        }
    }
}
export default adminAuthActions