import { Route, Redirect } from "react-router-dom";
import { isUserAuthenticated } from "./permissionChecker"
const UserRoute= ({ component: Component, ...rest}) => {
    return (
        <Route {...rest} 
                render={(props) => !isUserAuthenticated() ? <Redirect to={{ pathname: "/auth", state: {from: rest.path}}}/> : <Component {...props} /> } />
    )
}

export default UserRoute; 