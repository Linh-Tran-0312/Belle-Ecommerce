import { Route, Redirect } from "react-router-dom";
import { isUserAuthenticated } from "./permissionChecker";
const UserRoute= ({ component: Component, ...rest}) => {
   
    return (
        <Route {...rest} 
                render={(props) => isUserAuthenticated() ?  <Component {...props} />:<Redirect to={{ pathname: "/auth", state: {from: rest.path}}}/>  } />
    )
}

export default UserRoute; 