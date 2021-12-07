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
                    route.publicRoutes.map(route => <PublicRoute key={route.path} exact to={route.path} component={route.component} />)
                }
                {
                    route.userRoutes.map(route => <UserRoute key={route.path}  exact={!!route.exact} to={route.path} component={route.component} />)
                }
                {
                    route.adminRoutes.map(route => <AdminRoute key={route.path} exact to={route.path} component={route.component} />)
                }
              
            </Switch>
        </Router>
    )
}