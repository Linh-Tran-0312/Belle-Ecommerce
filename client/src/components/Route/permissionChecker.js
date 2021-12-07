

export const isAdminAuthenticated = () => {
    if(typeof window === "undefined") return false;
    let data = localStorage.getItem("admin");

    if(data)
    {
        let token = JSON.parse(data).token;
        if(token) return token;
    }
    return false
}
export const isUserAuthenticated = () => {
    if(typeof window === "undefined") return false;
    let data = localStorage.getItem("user");

    if(data)
    {
        let token = JSON.parse(data).token;
        if(token) return token;
    }
    return false
}

  