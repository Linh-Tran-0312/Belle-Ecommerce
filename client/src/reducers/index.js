import { combineReducers } from 'redux';
import adminBlog from "./adminBlog"; 
import adminProduct from "./adminProduct";
import adminUser from "./adminUser";
import adminOrder from "./adminOrder";
import home from "./home";
import shop from "./shop";
import blog from "./blog";
import order from "./order";
import auth from "./auth";
export const appReducer = combineReducers({ adminBlog, adminProduct, adminUser, adminOrder, home, shop, blog, order, auth })