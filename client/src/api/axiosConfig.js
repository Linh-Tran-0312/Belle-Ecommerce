import axios from "axios";
import {store }from "../index";
import { EVENT } from "../constants";
import eventBus from "../common/eventBus";

const refreshToken =  () => {
    return  API.get("/auth/token").then((res) => { 
        console.log(res.data.message);
    }).catch(err => {  
        
    })  
}
let baseURL = "";
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
   baseURL = process.env.REACT_APP_LOCAL_URL;
} else {
    baseURL = process.env.REACT_APP_HEROKU_URL;
}
let config = { 
    baseURL,
    timeout: 300000,
    }
const API = axios.create(config);
API.defaults.withCredentials = true;


// handle expired access token
API.interceptors.response.use((response) => { 
    return response 
}, async(error) => {
    const originalReq = error.config;
    const { message } = error?.response?.data || "";
    if(error?.response?.status === 401 && message === "jwt expired" && !originalReq._retry) {
        originalReq._retry = true;      
        await refreshToken();
       return API(originalReq)
    }  else {
        if(message === "Invalid token") {
            const {userAuth, adminAuth} = store.getState();
            if(adminAuth.admin?.id) {
                eventBus.dispatch(EVENT.ADMIN_LOGOUT)
 
            }
            if(userAuth.user?.id) {
                eventBus.dispatch(EVENT.USER_LOGOUT)
 
            }
        }   
      return Promise.reject(error);
       
    }
})

export default API