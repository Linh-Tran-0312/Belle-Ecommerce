import React from 'react';
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
const App =  () => {
    return(
        <Router>
            <Switch>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/cart" component={Cart}/>
            <Route path="/shop" component={Shop}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/product" component={Product}/>
            <Route path="/blogs/blog" component={Blog}/>
            <Route path="/blogs" component={Blogs}/>      
            <Route path="/" component={Home}/>
            </Switch>
           
        </Router>
    )
}

export default App;