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
    price: 0,
    variants: []
}
const initState = {
    isDeletingProductCategory: false,
    isDeletingProductColor: false,
    isDeletingProductBrand: false,
    isDeletingProductSize: false,
    isDeletingProduct: false,
    isDeletingProductVariant: false,
    categories: [],
    sizes: [],
    colors: [],
    brands: [],
    products: [],
    total: 0,
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
        
        //Handle product and product variant
        
        case ACTION.GET_PRODUCTS:
            draft.products = payload.products;
            draft.total = payload.total;
            break;
        case ACTION.GET_PRODUCT_BY_ID:
           
            draft.product = payload;
            break;
        case ACTION.CREATE_PRODUCT:
            draft.product = payload;
            draft.products.unshift(payload);
            draft.products.pop();
            draft.total = draft.total + 1;
            break;
        case ACTION.UPDATE_PRODUCT:
            draft.product = payload;
            draft.products = draft.products.map(p => p.id === payload.id ? payload : p);
            break;
        case ACTION.DELETE_PRODUCT:
            draft.product = initProduct;
            draft.products = draft.products.filter(p => p.id !== payload);
            draft.total = draft.total - 1;
            draft.isDeletingProduct = false;
            break;
        case ACTION.IS_DELETING_PRODUCT:
            draft.isDeletingProduct = true;
            break;
        case ACTION.CREATE_PRODUCT_VARIANT:
            if(draft.product.id === payload.productId)
            {
                draft.product.variants.unshift(payload)
            }
            break;
        case ACTION.UPDATE_PRODUCT_VARIANT:
            if(draft.product.id === payload.productId)
            {
                draft.product.variants = draft.product.variants.map(v => v.id === payload.id ? payload: v)
            }
            break;
        case ACTION.DELETE_PRODUCT_VARIANT:
            draft.product.variants = draft.product.variants.filter(v => v.id !== payload);
            draft.isDeletingProductVariant = false;
            break;
        case ACTION.IS_DELETING_PRODUCT_VARIANT:
            draft.isDeletingProductVariant = true;
            break;
        default:
        break;

    }



})