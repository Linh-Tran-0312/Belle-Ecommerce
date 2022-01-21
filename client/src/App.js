import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import { SnackbarProvider } from 'notistack';
import React, { Suspense, useEffect } from 'react';
import { useDispatch } from "react-redux";
import adminAuthActions from './actions/adminAuth';
import userAuthActions from "./actions/auth";
import homeActions from "./actions/home";
import './App.css';
import Loader from "./components/Loader";
import Routes from "./components/Route";
import { useNotifier } from "./helper/customHook";
const SuspenseWrapper = ({ children }) => {
    useNotifier();
    return <Suspense fallback={<Loader />}>
        {children}
    </Suspense>
}

const App = () => {

    const dispatch = useDispatch();
    const notistackRef = React.createRef();
    const onClickDismiss = key => () => {
        notistackRef.current.closeSnackbar(key);
    }


    useEffect(() => {
        dispatch(homeActions.getProductCategories());
        dispatch(homeActions.getProductBrands());
        dispatch(homeActions.getNewArrivals());
        dispatch(homeActions.getLatestBlogs());
        dispatch(homeActions.getBlogCategories());
        dispatch(userAuthActions.getProfile());
        dispatch(adminAuthActions.getProfile());
    }, [])


    return (<SnackbarProvider
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        TransitionComponent={Slide}
        ref={notistackRef}
        action={(key) => (
            <IconButton onClick={onClickDismiss(key)}>
                <CloseIcon style={{ color: "white" }} />
            </IconButton>
        )}
    >
        <SuspenseWrapper >
            <Routes />
        </SuspenseWrapper>
    </SnackbarProvider>
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