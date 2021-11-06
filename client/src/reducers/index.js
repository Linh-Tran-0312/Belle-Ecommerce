import { combineReducers } from 'redux';
import blog from "./blog"; 
import product from "./product";
export const appReducer = combineReducers({ blog, product })