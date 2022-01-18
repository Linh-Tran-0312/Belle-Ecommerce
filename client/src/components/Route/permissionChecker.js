import { store } from "../../index.js";

export const isAdminAuthenticated = () => {

   // let data = JSON.parse(localStorage.getItem("admin"));
    const { adminAuth } = store.getState()
    if(adminAuth?.admin?.id)
    {
       return true
    }
    return false
} 
export const isUserAuthenticated = () => {
   
    //let data =  JSON.parse(localStorage.getItem("user"));
    const { userAuth} = store.getState();
   
    if(userAuth?.user?.id)
    {
         return true
    }
    return false
}

  