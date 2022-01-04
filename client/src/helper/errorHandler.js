
import { MSG, SnackBar } from "../constants";
import { enqueueSnackbar } from "../actions/notification";
const errorHandler = (error, dispatch) => {
    if (error.response) {
        if(error.response?.data.message === "jwt expired") {
            dispatch(enqueueSnackbar("The authentication token has expired, please login again.", SnackBar.ERROR));
        } else {
            console.log(error.response.data?.message)
            dispatch(enqueueSnackbar(error.response.data?.message, SnackBar.ERROR));
        }
    } else {
        console.log(error);
        dispatch(enqueueSnackbar(MSG.STH_WRONG, SnackBar.ERROR));
    }
}

export default errorHandler;