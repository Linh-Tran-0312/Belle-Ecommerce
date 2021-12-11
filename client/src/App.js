import React, { Suspense, useEffect } from 'react';
import { useDispatch } from "react-redux";
import homeActions from "./actions/home";
import './App.css';
import Loader from "./components/Loader";
import Routes from "./components/Route";
 

const App =  () => {
 
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(homeActions.getProductCategories());
        dispatch(homeActions.getProductBrands());
        dispatch(homeActions.getNewArrivals());
        dispatch(homeActions.getLatestBlogs());
        dispatch(homeActions.getBlogCategories());
    },[])
    return(
        <Suspense fallback={<Loader />}>
          <Routes />
        </Suspense>

    )
}

export default App;

      /*   <Router>
            <Switch>
            <Route exact path="/user" component={User} />           
            <Route exact path="/admin/login" component={AdminAuth}/>
            <Route  path="/admin" component={Admin} />        
            <Route exact path="/auth" component={Auth}/>
            <Route exact path="/checkout"  component={Checkout}/>     
            <Route exact exact path="/cart" component={Cart}/>
            <Route exact path="/shop" component={Shop}/>
            <Route exact path="/contact" component={Contact}/>
            <Route path="/shop/product/:productId" component={Product}/>
            <Route path="/blogs/blog/:id" component={Blog}/>
            <Route path="/blogs" component={Blogs}/>      
            <Route exact path="/" component={Home}/>
            <Route path="*" component={ErrorPage}/>
            </Switch>
        </Router> */