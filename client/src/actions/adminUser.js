import api from "../api";
import { ACTION, Query, MSG, SnackBar } from "../constants";
import handleFilter from "../helper/handleFilter";
import errorHandler from "../helper/errorHandler";
import { enqueueSnackbar } from "./notification";
const formUser = (formData) => {
    const body = {
        fname: formData.fname,
        lname: formData.lname,
        phone: formData.phone,
        email: formData.email,
        role: formData.role,
        address: formData.address,
    }
    return body;
}
 
const userActions = {
    
    getUsers: (filter) => async(dispatch) => {
        try {
            let queryString = "";
            queryString = handleFilter(filter);
            switch(filter.sortMethod) {
                case "3":
                    queryString += `&sort=sale&change=${Query.ASC}`;
                    break;
                case "4":
                    queryString += `&sort=sale&change=${Query.DESC}`;
                    break;
                case "1":
                    queryString += `&sort=lname&change=${Query.ASC}`;
                    break;
                case "2":
                    queryString += `&sort=lname&change=${Query.DESC}`;
                    break;
                case "5":
                    queryString += `&sort=createdAt&change=${Query.ASC}`;
                    break;
                default:
                    break;
            }
            dispatch({ type: ACTION.USER_LOADING, payload: true});
            const { data } = await api.getUsers(queryString);
            dispatch({ type: ACTION.GET_USERS, payload: data});
        } catch (error) {
            dispatch({ type: ACTION.USER_LOADING, payload: false});
            errorHandler(error, dispatch);
        }
    },
    getUserById: (id) => async(dispatch) => {
        try {
            dispatch({ type: ACTION.USER_LOADING, payload: true});
            const { data } = await api.getUserById(id);
            dispatch({ type: ACTION.GET_USER_BY_ID, payload: data})
        } catch (error) {
            dispatch({ type: ACTION.USER_LOADING, payload: false});
            errorHandler(error, dispatch);
        }
    },
    createUser: (formData) => async(dispatch) => {
        try {
            if(formData.password !== formData.confirm_password)
            {
                dispatch(enqueueSnackbar(MSG.CF_PASS, SnackBar.ERROR));
            } else {
                const body = formUser(formData);
                body.password = formData.password;
                dispatch({ type: ACTION.USER_LOADING, payload: true});
                const { data } = await api.createUser(body);
                dispatch(enqueueSnackbar(MSG.C_USER, SnackBar.SUCCESS));
                dispatch({ type: ACTION.CREATE_USER, payload: data})
            }        
        } catch (error) {
            dispatch({ type: ACTION.USER_LOADING, payload: false});
            errorHandler(error, dispatch);
        }
    },
    updateUser: (id,formData) => async(dispatch) => {
        try {
            const body = formUser(formData);
            dispatch({ type: ACTION.USER_LOADING, payload: true});
            const { data } = await api.updateUser(id,body);
            dispatch(enqueueSnackbar(MSG.U_USER, SnackBar.SUCCESS));
            dispatch({ type: ACTION.UPDATE_USER, payload: data})
        } catch (error) {
            dispatch({ type: ACTION.USER_LOADING, payload: false});
            errorHandler(error, dispatch);
        }
    }


}

export default userActions;