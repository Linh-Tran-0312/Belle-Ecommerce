import api from "../api";
import { ACTION, Query } from "../constants";
import handleFilter from "../helper/handleFilter";

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
                    queryString += `&sort=name&change=${Query.ASC}`;
                    break;
                case "2":
                    queryString += `&sort=name&change=${Query.DESC}`;
                    break;
                case "5":
                    queryString += `&sort=createdAt&change=${Query.ACS}`;
                    break;
                default:
                    break;
            }
            const { data } = await api.getUsers(queryString);
            dispatch({ type: ACTION.GET_USERS, payload: data})
        } catch (error) {
            console.log(error.message);
            dispatch({ type: ACTION.ERROR, payload: error.message})
        }
    },
    getUserById: (id) => async(dispatch) => {
        try {
            const { data } = await api.getUserById(id);
            dispatch({ type: ACTION.GET_USER_BY_ID, payload: data})
        } catch (error) {
            console.log(error.message);
            dispatch({ type: ACTION.ERROR, payload: error.message})
        }
    },
    createUser: (formData) => async(dispatch) => {
        try {
            if(formData.password !== formData.confirm_password)
            {
                dispatch({ type: ACTION.USER_MESSAGE, payload : "Password and confirm password not match"})
            } else {
                const body = formUser(formData);
                body.password = formData.password;
                const { data } = await api.createUser(body);
                dispatch({ type: ACTION.CREATE_USER, payload: data})
            }        
        } catch (error) {
            if (error.response) {
                dispatch({ type:  ACTION.USER_MESSAGE, payload: error.response.data.message })
            } else {    
                dispatch({ type: ACTION.ERROR, payload: error})
            }
            console.log(error);

        }
    },
    updateUser: (id,formData) => async(dispatch) => {
        try {
            console.log(formData);
            const body = formUser(formData);
            console.log(body);
            const { data } = await api.updateUser(id,body);
            dispatch({ type: ACTION.UPDATE_USER, payload: data})
        } catch (error) {
            if (error.response) {
                dispatch({ type:  ACTION.USER_MESSAGE, payload: error.response.data.message })
            } else {    
                dispatch({ type: ACTION.ERROR, payload: error})
            }
            console.log(error);

        }
    }


}

export default userActions;