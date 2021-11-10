import { combineReducers } from 'redux';
import blog from "./blog"; 
import product from "./product";
import user from "./user";
import order from "./order";
export const appReducer = combineReducers({ blog, product,user, order })