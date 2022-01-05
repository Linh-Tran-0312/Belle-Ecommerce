

export const isAdminAuthenticated = () => {

    let data = JSON.parse(localStorage.getItem("admin"));

    if(data?.id)
    {
       return true
    }
    return false
} 
export const isUserAuthenticated = () => {
   
    let data =  JSON.parse(localStorage.getItem("user"));

    if(data?.id)
    {
         return true
    }
    return false
}

  