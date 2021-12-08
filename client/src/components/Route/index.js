import { BrowserRouter as Router, Switch } from "react-router-dom"
import route from "./routes.js";
import PublicRoute from "./PublicRoute";
import UserRoute from "./UserRoute";
import AdminRoute from "./AdminRoute";
export default () => {
    return(
        <Router>
            <Switch>
         
                {
                    route.userRoutes.map(route => <UserRoute key={route.path}  exact={route.exact} path={route.path} component={route.component} />)
                }
                {
                    route.adminRoutes.map(route => <AdminRoute key={route.path} exact={route.exact} path={route.path} component={route.component} />)
                }
                {
                    route.publicRoutes.map(({ component, path, exact }) => <PublicRoute key={path} exact={exact} path={path} component={component}/>)
                }
              
            </Switch>
        </Router>
    )
}