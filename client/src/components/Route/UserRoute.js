import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, useHistory } from "react-router-dom";
import Loader from "../Loader";
import eventBus from "../../common/eventBus";
import { useEffect } from "react";
import userAuthActions from "../../actions/auth";
import { EVENT } from "../../constants";

const UserRoute= ({ component: Component, ...rest}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const loading = useSelector(state => state.userAuth.profileLoading);
    const user = useSelector(state => state.userAuth.user);

    useEffect(() => {
        eventBus.on(EVENT.USER_LOGOUT, () => {
            if(user?.id) {
                dispatch(userAuthActions.logout(history))
            }
        })
    },[])

    if(loading) return <Loader/>
    if(!user?.id) return  <Redirect to={{ pathname: "/auth", state: {from: rest.path}}}/>
    return (
        <Route {...rest} 
                render={(props) => <Component {...props}/> } />
    )
}

export default UserRoute; 