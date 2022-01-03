import React, { Suspense, useEffect } from 'react';
import homeActions from "./actions/home";
import './App.css';
import Loader from "./components/Loader";
import Routes from "./components/Route";
import { useNotifier } from "./helper/customHook";
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from "react-redux";
import { ACTION } from "./constants";
import { SnackbarProvider } from 'notistack';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';

const SuspenseWrapper = ({children}) => {
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
    }, [])

    /*   const notifications = useSelector(state => state.notification).notifications;
      const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  
      const storeDisplayed = (id) => {
          displayed = [...displayed, id];
      };
  
      const removeDisplayed = (id) => {
          displayed = [...displayed.filter(key => id !== key)];
      };
  
      React.useEffect(() => {
          notifications.forEach(({ key, message, options = {}, dismissed = false }) => {
              if (dismissed) {
                  // dismiss snackbar using notistack
                  closeSnackbar(key);
                  return;
              }
  
              // do nothing if snackbar is already displayed
              if (displayed.includes(key)) return;
  
              // display snackbar using notistack
              enqueueSnackbar(message, {
                  key,
                  ...options,
                  onClose: (event, reason, myKey) => {
                      if (options.onClose) {
                          options.onClose(event, reason, myKey);
                      }
                  },
                  onExited: (event, myKey) => {
                      // remove this snackbar from redux store
                      dispatch({type: ACTION.REMOVE_SNACKBAR,key: myKey});
                      removeDisplayed(myKey);
                  },
              });
  
              // keep track of snackbars that we've displayed
              storeDisplayed(key);
          });
      }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]); */
    return (<SnackbarProvider
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        TransitionComponent={Slide}
        ref={notistackRef}
        action={(key) => (
            <IconButton onClick={onClickDismiss(key)}>
                <CloseIcon style={{color: "white"}}/>
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