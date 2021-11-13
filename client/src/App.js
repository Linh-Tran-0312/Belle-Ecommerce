import React, { useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
 
import homeActions from "./actions/home";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/home.js';
import Shop from './pages/shop.js';
import Contact from './pages/contact.js';
import Product from './pages/product'
import './App.css';
import Blogs from './pages/blogs.js';
import Blog from './pages/blog.js';
import Cart from './pages/cart';
import Checkout from './pages/checkout';
import Auth from './pages/auth';
import ErrorPage from './pages/404page';
import Admin from "./pages/admin";
import User from "./pages/user";
 

const App =  () => {
        console.log("Layout render")
    const isLogin = useSelector(state => state.auth).isLogin
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(homeActions.getProductCategories());
        dispatch(homeActions.getProductBrands());
        dispatch(homeActions.getNewArrivals());
        dispatch(homeActions.getLatestBlogs());
        dispatch(homeActions.getBlogCategories());
    },[])
    return(
        <Router>
            <Switch>
            <Route exact path="/user"  >
             { isLogin ? (<User />) : (<Redirect to="/auth" component={Auth}/>)}
            </Route>
            <Route  path="/admin" component={Admin}/>
            <Route exact path="/auth" component={Auth}/>
            <Route exact path="/checkout"  >
                { isLogin ? (<Checkout />) :(<Redirect to="/auth" component={Auth}/>)}
            </Route>
            <Route exact exact path="/cart" component={Cart}/>
            <Route exact path="/shop" component={Shop}/>
            <Route exact path="/contact" component={Contact}/>
            <Route path="/shop/product/:productId" component={Product}/>
            <Route path="/blogs/blog/:id" component={Blog}/>
            <Route path="/blogs" component={Blogs}/>      
            <Route exact path="/" component={Home}/>
            <Route path="*" component={ErrorPage}/>
            </Switch>
        </Router>
    )
}

export default App;