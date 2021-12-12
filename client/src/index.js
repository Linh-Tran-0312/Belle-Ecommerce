import ReactDOM from 'react-dom';
import App from './App';

import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { appReducer } from './reducers';
import Slide from '@material-ui/core/Slide';
import { SnackbarProvider } from 'notistack';
export const store = createStore(appReducer, compose(applyMiddleware(thunk)));


ReactDOM.render(<Provider store={store}>  <SnackbarProvider
    anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
    }}
    TransitionComponent={Slide}
>
    <App/>
    </SnackbarProvider>
    </Provider>, document.getElementById("root"))
