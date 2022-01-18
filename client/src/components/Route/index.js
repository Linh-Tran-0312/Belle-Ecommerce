import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import route from "./routes.js";
import  Layout from "../Layout"
import PublicRoute from "./PublicRoute";
import UserRoute from "./UserRoute";
import AdminRoute from "./AdminRoute";


export default () => {
    return(
        <Router>
            <Switch>
               
                {
                    route.adminRoutes.map(route => <AdminRoute key={route.path} exact={route.exact} path={route.path} component={route.component} />)
                }
                <PublicRoute  key={route.adminPublicRoute.path} exact={route.adminPublicRoute.exact} path={route.adminPublicRoute.path} component={route.adminPublicRoute.component}/>
                <Route>
                    <Layout>
                        <Switch>
                        {
                    route.userRoutes.map(route => <UserRoute key={route.path}  exact={route.exact} path={route.path} component={route.component} />)
                }

                {
                    route.publicRoutes.map(({ component, path, exact }) => <PublicRoute key={path} exact={exact} path={path} component={component}/>)
                }
                        </Switch>
                    </Layout>
                </Route>     
            </Switch>
            </Router>
    )
}