import axios from "axios";
import {store }from "../index";
import { ACTION } from "../constants";

const refreshToken =  () => {
    return  API.get("/auth/token").then((res) => { 
        console.log(res.data.message);
    }).catch(err => {
       if(err?.response?.data?.role === "admin" || err?.response?.data?.role === "editor" ) {
            store.dispatch({ type: ACTION.ADMIN_LOGOUT})
        } else {
            store.dispatch({ type: ACTION.USER_LOGOUT})
        }      
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
        if( message === "No token provided") {
            store.dispatch({ type: ACTION.ADMIN_LOGOUT});
            store.dispatch({ type: ACTION.USER_LOGOUT});
            store.dispatch({ type: ACTION.CLEAR_ORDER})
        }   
      return Promise.reject(error);
       
    }
})

export default API