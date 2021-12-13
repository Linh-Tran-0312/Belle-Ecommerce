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
    productCategoryLoading: false,
    productColorLoading: false,
    productBrandLoading: false,
    productSizeLoading: false,
    productLoading: false,
    productVariantLoading: false,
    categories: [],
    sizes: [],
    colors: [],
    brands: [],
    products: [],
    total: 0,
    product: initProduct,
}
export default (state = initState, { type, payload}) => produce(state, (draft) => {

    switch(type) {

        //Handle product category
        case ACTION.GET_PRODUCT_CATEGORIES:
            draft.categories = payload;
            draft.productCategoryLoading = false;
            break;
        case ACTION.CREATE_PRODUCT_CATEGORY: 
            draft.categories.unshift(payload);
            draft.productCategoryLoading = false;   
            break;
        case ACTION.UPDATE_PRODUCT_CATEGORY: 
            draft.categories = draft.categories.map(c => c.id === payload.id ? payload : c);
            draft.productCategoryLoading = false;
            break;
        case ACTION.PRODUCT_CATEGORY_LOADING: 
            draft.productCategoryLoading = payload;
            break;
        case ACTION.DELETE_PRODUCT_CATEGORY:
            draft.productCategoryLoading = false;  
            draft.categories = draft.categories.filter(c => c.id !== payload )   
            break;

        //Handle product color
        case ACTION.GET_PRODUCT_COLORS:
            draft.colors = payload;
            draft.productColorLoading = false;
            break;
        case ACTION.CREATE_PRODUCT_COLOR: 
            draft.colors.unshift(payload);
            draft.productColorLoading = false;  
            break;
        case ACTION.UPDATE_PRODUCT_COLOR: 
            draft.colors = draft.colors.map(c => c.id === payload.id ? payload : c);
            draft.productColorLoading = false;  
            break;
        case ACTION.PRODUCT_COLOR_LOADING:  
            draft.productColorLoading = payload;
            break;
        case ACTION.DELETE_PRODUCT_COLOR:
            draft.productColorLoading = false;   
            draft.colors = draft.colors.filter(c => c.id !== payload )   
            break;

        //Handle product brand
        case ACTION.GET_PRODUCT_BRANDS:
            draft.brands = payload;
            draft.productBrandLoading = false;  
            break;
        case ACTION.CREATE_PRODUCT_BRAND:
            draft.brands.unshift(payload);
            draft.productBrandLoading = false;   
            break;
        case ACTION.UPDATE_PRODUCT_BRAND: 
            draft.brands = draft.brands.map(b => b.id === payload.id ? payload : b);
            draft.productBrandLoading = false;     
            break;
        case ACTION.PRODUCT_BRAND_LOADING: 
            draft.productBrand = payload;
            break;
        case ACTION.DELETE_PRODUCT_BRAND:
            draft.productBrandLoading = false;   
            draft.brands = draft.brands.filter(b => b.id !== payload )   
            break;

        //Handle product size
        case ACTION.GET_PRODUCT_SIZES:
            draft.sizes = payload;
            draft.productSizeLoading = false; 
            break;
        case ACTION.CREATE_PRODUCT_SIZE:
            draft.sizes.unshift(payload);
            draft.productSizeLoading = false;    
            break;
        case ACTION.UPDATE_PRODUCT_SIZE: 
            draft.sizes = draft.sizes.map(s => s.id === payload.id ? payload : s);
            draft.productSizeLoading = false;    
            break;
        case ACTION.PRODUCT_SIZE_LOADING: 
            draft.productSizeLoading = payload;
            break;
        case ACTION.DELETE_PRODUCT_SIZE:
            draft.productSizeLoading = false;   
            draft.sizes = draft.sizes.filter(s => s.id !== payload )   
            break;     
        
        //Handle product and product variant
        
        case ACTION.GET_PRODUCTS:
            draft.products = payload.products;
            draft.total = payload.total;
            draft.productLoading = false; 
            break;
        case ACTION.GET_PRODUCT_BY_ID:
            draft.productLoading = false; 
            draft.product = payload;
            break;
        case ACTION.CREATE_PRODUCT:
            draft.product = payload;
            draft.products.unshift(payload);
            draft.products.pop();
            draft.total = draft.total + 1;
            draft.productLoading = false; 
            break;
        case ACTION.UPDATE_PRODUCT:
            draft.product = payload;
            draft.products = draft.products.map(p => p.id === payload.id ? payload : p);
            draft.productLoading = false; 
            break;
        case ACTION.DELETE_PRODUCT:
            draft.product = initProduct;
            draft.products = draft.products.filter(p => p.id !== payload);
            draft.total = draft.total - 1;
            draft.productLoading = false;
            break;
        case ACTION.PRODUCT_LOADING:
            draft.productLoading = payload;
            break;
        case ACTION.CREATE_PRODUCT_VARIANT:
            if(draft.product.id === payload.productId)
            {
                draft.product.variants.unshift(payload)
            }
            draft.productVariantLoading = false; 
            break;
        case ACTION.UPDATE_PRODUCT_VARIANT:
            if(draft.product.id === payload.productId)
            {
                draft.product.variants = draft.product.variants.map(v => v.id === payload.id ? payload: v)
            }
            draft.productVariantLoading = false; 
            break;
        case ACTION.DELETE_PRODUCT_VARIANT:
            draft.product.variants = draft.product.variants.filter(v => v.id !== payload);
            draft.productVariantLoading = false; 
            break;
        case ACTION.PRODUCT_VARIANT_LOADING:
            draft.productVariantLoading = payload;
            break;
        default:
            return draft;
    }
})