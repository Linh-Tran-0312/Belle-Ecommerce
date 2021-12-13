
import { MSG, SnackBar } from "../constants";
import { enqueueSnackbar } from "../actions/notification";
const errorHandler = (error, dispatch) => {
    if (error.response) {
        dispatch(enqueueSnackbar(error.response.data?.message, SnackBar.ERROR));
    } else {
        console.log(error);
        dispatch(enqueueSnackbar(MSG.STH_WRONG, SnackBar.ERROR));
    }
}

export default errorHandler;