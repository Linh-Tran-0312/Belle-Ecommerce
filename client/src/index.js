import ReactDOM from 'react-dom';
import App from './App';

import { createStore, compose, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { appReducer } from './reducers';

export const store = createStore(appReducer, compose(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"))
