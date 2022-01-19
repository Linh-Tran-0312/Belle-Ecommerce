import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Loader from "../Loader";
import { isAdminAuthenticated } from "./permissionChecker"
const AdminRoute= ({ component: Component, ...rest}) => {
/*     const loading = useSelector(state => state.adminAuth.loading);
    if(loading) return <Loader/> 
    !isAdminAuthenticated() ? <Redirect to="/admin/login"/> : 
    */
    return (
        <Route {...rest} 
                render={(props) => <Component {...props} /> } />
    )
}

export default AdminRoute;