import { combineReducers } from 'redux';
import blog from "./blog"; 
import product from "./product";
import user from "./user";
export const appReducer = combineReducers({ blog, product,user })