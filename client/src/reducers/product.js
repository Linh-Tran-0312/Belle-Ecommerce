import produce from "immer";
import {ACTION} from "../constants";

const initProduct = {
    id: "",
    name: "",
    categoryId: "",
    brandId: "",
    imgPaths: [],
    sku: "",
    summary: "",
    description: "",
    price: ""
}
const initState = {
    isDeletingProductCategory: false,
    isDeletingProductColor: false,
    isDeletingProductBrand: false,
    isDeletingProductSize: false,
    isDeletingProduct: false,
    categories: [],
    sizes: [],
    colors: [],
    brands: [],
    products: [],
    pagination: {
        total: 5
    },
    product: initProduct,
    error: null,
}
export default (state = initState, { type, payload}) => produce(state, (draft) => {

    switch(type) {
        case ACTION.ERROR: 
        draft.error = payload;   
        break;
        //Handle product category
        case ACTION.GET_PRODUCT_CATEGORIES:
            draft.categories = payload;
            break;
        case ACTION.CREATE_PRODUCT_CATEGORY: 
            draft.categories.unshift(payload)     
            break;
        case ACTION.UPDATE_PRODUCT_CATEGORY: 
            draft.categories = draft.categories.map(c => c.id === payload.id ? payload : c)   
            break;
        case ACTION.IS_DELETING_PRODUCT_CATEGORY: 
            draft.isDeletingProductCategory = true;  
            break;
        case ACTION.DELETE_PRODUCT_CATEGORY:
            draft.isDeletingProductCategory = false;   
            draft.categories = draft.categories.filter(c => c.id !== payload )   
            break;

    //Handle product color
        case ACTION.GET_PRODUCT_COLORS:
            draft.colors = payload;
            break;
        case ACTION.CREATE_PRODUCT_COLOR: 
            draft.colors.unshift(payload)     
            break;
        case ACTION.UPDATE_PRODUCT_COLOR: 
            draft.colors = draft.colors.map(c => c.id === payload.id ? payload : c)   
            break;
        case ACTION.IS_DELETING_PRODUCT_COLOR: 
            draft.isDeletingProductColor = true;  
            break;
        case ACTION.DELETE_PRODUCT_COLOR:
            draft.isDeletingProductColor = false;   
            draft.colors = draft.colors.filter(c => c.id !== payload )   
            break;

        //Handle product brand
        case ACTION.GET_PRODUCT_BRANDS:
            draft.brands = payload;
            break;
        case ACTION.CREATE_PRODUCT_BRAND:
            draft.brands.unshift(payload)     
            break;
        case ACTION.UPDATE_PRODUCT_BRAND: 
            draft.brands = draft.brands.map(b => b.id === payload.id ? payload : b)   
            break;
        case ACTION.IS_DELETING_PRODUCT_BRAND: 
            draft.isDeletingProductBrand = true;  
            break;
        case ACTION.DELETE_PRODUCT_BRAND:
            draft.isDeletingProductBrand = false;   
            draft.brands = draft.brands.filter(b => b.id !== payload )   
            break;

        //Handle product size
        case ACTION.GET_PRODUCT_SIZES:
            draft.sizes = payload;
            break;
        case ACTION.CREATE_PRODUCT_SIZE:
            draft.sizes.unshift(payload)     
            break;
        case ACTION.UPDATE_PRODUCT_SIZE: 
            draft.sizes = draft.sizes.map(s => s.id === payload.id ? payload : s)   
            break;
        case ACTION.IS_DELETING_PRODUCT_SIZE: 
            draft.isDeletingProductSize = true;  
            break;
        case ACTION.DELETE_PRODUCT_SIZE:
            draft.isDeletingProductSize = false;   
            draft.sizes = draft.sizes.filter(s => s.id !== payload )   
            break;     
        default:
        break;

    }



})