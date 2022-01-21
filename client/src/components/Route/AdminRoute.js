
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import Loader from "../Loader";

const AdminRoute= ({ component: Component, ...rest}) => {
    const loading = useSelector(state => state.adminAuth.profileLoading);
    const admin = useSelector(state => state.adminAuth.admin);
    if(loading) return <Loader/>
    if(!admin?.id) return  <Redirect to={{ pathname: "/admin/login", state: {from: rest.path}}}/>
    return (
        <Route {...rest} 
                render={(props) => <Component {...props}/> } />
    )
}

export default AdminRoute;