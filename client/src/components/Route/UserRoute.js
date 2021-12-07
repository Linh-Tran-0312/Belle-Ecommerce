import { Route, Redirect } from "react-router-dom";
import { isUserAuthenticated } from "./permissionChecker"
const UserRoute= ({ component: Component, ...rest}) => {
    return (
        <Route {...rest} 
                render={(props) => !isUserAuthenticated() ? <Redirect to="/auth"/> : <Component {...props} /> } />
    )
}

export default UserRoute;