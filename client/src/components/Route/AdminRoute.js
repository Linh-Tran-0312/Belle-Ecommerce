import { Route, Redirect } from "react-router-dom";
import { isAdminAuthenticated } from "./permissionChecker"
const AdminRoute= ({ component: Component, ...rest}) => {
    return (
        <Route {...rest} 
                render={(props) => !isAdminAuthenticated() ? <Redirect to="/admin/login"/> : <Component {...props} /> } />
    )
}

export default AdminRoute;