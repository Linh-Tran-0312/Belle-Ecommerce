import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/home.js';
import Shop from './pages/shop.js';
import Contact from './pages/contact.js';
import './App.css';
const App =  () => {
    return(
        <Router>
            <Switch>
            <Route path="/shop" component={Shop}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/" component={Home}/>
            </Switch>
           
        </Router>
    )
}

export default App;