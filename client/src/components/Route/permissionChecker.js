

export const isAdminAuthenticated = () => {
    console.log("here")
    //if(typeof window === "undefined") return false;
    let data = JSON.parse(localStorage.getItem("admin"));

    if(data?.id)
    {
       return true
    }
    return false
} 
export const isUserAuthenticated = () => {
    //if(typeof window === "undefined") return false;
    console.log("here")
    let data =  JSON.parse(localStorage.getItem("user"));

    if(data?.id)
    { console.log(data?.id)
         return true
    }
    return false
}

  