import { ACTION } from "../../constants/index.js";
import { store } from "../../index.js";
import api from "../../api"
export const isAdminAuthenticated = () => {

   // let data = JSON.parse(localStorage.getItem("admin"));
    const { adminAuth } = store.getState()
    if(adminAuth?.admin?.id)
    {
       return true
    }
    return false
} 
const getUser = async() => {
    const user = {};
    try {
         const { data } = await api.getUserProfile();
         store.dispatch({ type: ACTION.USER_INIT, payload: data})
         user = data;
     } catch (error) {
       
    }
    return user
}
export const isUserAuthenticated = async() => {
    const user = await getUser()
    if(user?.id) return true;
    return false;
}

  