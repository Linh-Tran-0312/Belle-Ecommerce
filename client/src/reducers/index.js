import { combineReducers } from 'redux';
import adminBlog from "./adminBlog"; 
import adminProduct from "./adminProduct";
import adminUser from "./adminUser";
import adminOrder from "./adminOrder";
import adminAuth from "./adminAuth";
import home from "./home";
import shop from "./shop";
import blog from "./blog";
import order from "./order";
import userAuth from "./userAuth";
import notification  from './notification';
import report from "./adminReport";
export const appReducer = combineReducers({ report, notification, adminAuth, adminBlog, adminProduct, adminUser, adminOrder, home, shop, blog, order, userAuth })