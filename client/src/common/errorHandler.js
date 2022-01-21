
import { MSG, SnackBar } from "../constants";
import { enqueueSnackbar } from "../actions/notification";


export const handleValidationError = (error) => {
    let message = "Invalid input: "
    if(error?.response?.data?.message === "Validation Failed") {
        const{ details} = error?.response?.data
        const fields = Object.keys( error?.response?.data.details)
        fields.forEach(field => {
            message = message + " " + details[field].message + ".";
        })
    }
    return message
}
const errorHandler = (error, dispatch) => {
    if (error.response) {
        if(error.response?.data.message === "jwt expired") {
            //dispatch(enqueueSnackbar("The authentication token has expired, please login again.", SnackBar.ERROR));
        }
        else if(error?.response?.data?.message === "Invalid token" ||error?.response?.data?.message === "No token provided"  ) {
            console.log(error?.response?.data?.message)
        }
        else if(error?.response?.data?.message === "Validation Failed") {
            const{ details} = error?.response?.data
            const fields = Object.keys( error?.response?.data.details)
            fields.forEach(field => {
                dispatch(enqueueSnackbar(details[`${field}`]?.message, SnackBar.ERROR));
            })
        }
         else {
            console.log(error.response.data?.message)
            dispatch(enqueueSnackbar(error.response.data?.message, SnackBar.ERROR));
        }
    } else {
        console.log(error);
        dispatch(enqueueSnackbar(MSG.STH_WRONG, SnackBar.ERROR));
    }
}

export default errorHandler;