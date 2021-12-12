
export const AdminPath = {
    DASHBOARD: "",
    ORDERS: "orders",
    PRODUCTS: "products",
    PRODUCT_LIST:"product-list",
    PRODUCT_CATEGORY: "product-category",
    PRODUCT_COLOR: "product-color",
    PRODUCT_BRAND: "product-brand",
    PRODUCT_SIZE: "product-size",
    BLOGS: "blogs",
    BLOG_LIST: 'blog-list',
    BLOG_CATEGORY: "blog-category",
    REPORTS: "reports",
    CUSTOMERS: "customers"
}

export const Query = {
    ASC : "ASC",
    DESC: "DESC",
}
// MUI Snackbar variant
export const SnackBar = {
    INFO: "info",
    WARNING: "warning",
    SUCCESS: "success",
    ERROR: "error"
}
export const ORDER_STATUS = {
    ORDERING: "ordering",
    ORDERED: "ordered",
    DELIVERY: "delivery",
    COMPLETED: "completed",
    CANCELED: "canceled"
}

export const MSG = {
    STH_WRONG: "Sorry, something went wrong...",
    CF_PASS: "Please make sure your password match",

    C_BLOG_CATEGORY: "Create blog category successfully",
    U_BLOG_CATEGORY: "Update blog category successfully",
    D_BLOG_CATEGORY: "The blog category was deleted",
    C_BLOG: "Create blog successfully",
    U_BLOG: "Update blog successfully",
    D_BLOG: "The blog was deleted",
    C_PRODUCT: "Create product successfully",
    U_PRODUCT: "Update product successfully",
    D_PRODUCT: "The product was deleted",
    C_PRODUCT_CATEGORY: "Create product category successfully",
    U_PRODUCT_CATEGORY: "Update product category successfully",
    D_PRODUCT_CATEGORY: "The product category was deleted",
    C_PRODUCT_BRAND: "Create product brand successfully",
    U_PRODUCT_BRAND: "Update product brand successfully",
    D_PRODUCT_BRAND: "The product brand was deleted",
    C_PRODUCT_SIZE: "Create product size successfully",
    U_PRODUCT_SIZE: "Update product size successfully",
    D_PRODUCT_SIZE: "The product size was deleted",
    C_PRODUCT_COLOR: "Create product color successfully",
    U_PRODUCT_COLOR: "Update product color successfully",
    D_PRODUCT_COLOR: "The product color was deleted",

    C_USER: "Create user successfully",
    U_USER: "Update user successfully",

    ADD_PRODUCT_TO_CART: "Add the product to cart successfully"
  




}
export const ACTION = {
    /***********************************ADMIN ACTION***************************************/
    //------------------AUTH ACTION----------------------------
    ADMIN_INIT: "ADMIN_INIT",
    ADMIN_AUTH: "ADMIN_AUTH",
    ADMIN_LOGOUT: "ADMIN_LOGOUT",
    ADMIN_AUTH_ERROR: "ADMIN_AUTH_ERROR",
    ADMIN_AUTH_LOADING: "ADMIN_AUTH_LOADING",

    //------------------BLOG ACTION----------------------------
    //Error Action
    ERROR: "ERROR",

    //Blog Category Action
    GET_BLOG_CATEGORIES: "GET_BLOG_CATEGORIES",
    CREATE_BLOG_CATEGORY: "CREATE_BLOG_CATEGORY",
    UPDATE_BLOG_CATEGORY: "UPDATE_BLOG_CATEGORY",
    DELETE_BLOG_CATEGORY: "DELETE_BLOG_CATEGORY",
    IS_DELETING_BLOG_CATEGORY: "IS_DELETING_BLOG_CATEGORY",
    BLOG_CATEGORY_STATUS: "BLOG_CATEGORY_STATUS",
    BLOG_CATEGORY_LOADING: "BLOG_CATEGORY_LOADING",
    BLOG_CATEGORY_ERROR: " BLOG_CATEGORY_ERROR",

     //Blog Action
    GET_BLOGS: "GET_BLOGS",
    GET_BLOG_BY_ID: "GET_BLOG_BY_ID",
    INIT_BLOG:"INIT_BLOG",
    CREATE_BLOG: "CREATE_BLOG",
    UPDATE_BLOG: "UPDATE_BLOG",
    DELETE_BLOG: "DELETE_BLOG",
    IS_DELETING_BLOG: "IS_DELETING_BLOG",
    BLOG_LOADING: "BLOG_LOADING",
    BLOG_ERROR: "BLOG_ERROR",

    //------------------PRODUCT ACTION----------------------------
    //Product Size Action
    GET_PRODUCT_SIZES: "GET_PRODUCT_SIZES",
    CREATE_PRODUCT_SIZE: "CREATE_PRODUCT_SIZE",
    UPDATE_PRODUCT_SIZE: "UPDATE_PRODUCT_SIZE",
    DELETE_PRODUCT_SIZE: "DELETE_PRODUCT_SIZE",
    IS_DELETING_PRODUCT_SIZE: "IS_DELETING_PRODUCT_SIZE",
    PRODUCT_CATEGORY_LOADING: "PRODUCT_CATEGORY_LOADING",
    PRODUCT_CATEGORY_ERROR: "PRODUCT_CATEGORY_ERROR",


     //Product Color Action
     GET_PRODUCT_COLORS: "GET_PRODUCT_COLORS",
     CREATE_PRODUCT_COLOR: "CREATE_PRODUCT_COLOR",
     UPDATE_PRODUCT_COLOR: "UPDATE_PRODUCT_COLOR",
     DELETE_PRODUCT_COLOR: "DELETE_PRODUCT_COLOR",
     IS_DELETING_PRODUCT_COLOR: "IS_DELETING_PRODUCT_COLOR",
     PRODUCT_COLOR_LOADING: "  PRODUCT_COLOR_LOADING",
     PRODUCT_COLOR_ERROR: "  PRODUCT_COLOR_ERROR",

      //Product  Brand Action
    GET_PRODUCT_BRANDS: "GET_PRODUCT_BRANDS",
    CREATE_PRODUCT_BRAND: "CREATE_PRODUCT_BRAND",
    UPDATE_PRODUCT_BRAND: "UPDATE_PRODUCT_BRAND",
    DELETE_PRODUCT_BRAND: "DELETE_PRODUCT_BRAND",
    IS_DELETING_PRODUCT_BRAND: "IS_DELETING_PRODUCT_BRAND",
    PRODUCT_BRAND_LOADING: "PRODUCT_BRAND_LOADING",
    PRODUCT_BRAND_ERROR: "PRODUCT_BRAND_ERROR",

    //Product Category Action
    GET_PRODUCT_CATEGORIES: "GET_PRODUCT_CATEGORIES",
    CREATE_PRODUCT_CATEGORY: "CREATE_PRODUCT_CATEGORY",
    UPDATE_PRODUCT_CATEGORY: "UPDATE_PRODUCT_CATEGORY",
    DELETE_PRODUCT_CATEGORY: "DELETE_PRODUCT_CATEGORY",
    IS_DELETING_PRODUCT_CATEGORY: "IS_DELETING_PRODUCT_CATEGORY",
    PRODUCT_CATEGORY_LOADING: "PRODUCT_CATEGORY_LOADING",
    PRODUCT_CATEGORY_ERROR: "PRODUCT_CATEGORY_ERROR",

    //Product Action
    GET_PRODUCTS: "GET_PRODUCT_PRODUCTS",
    GET_PRODUCT_BY_ID: "GET_PRODUCT_BY_ID",
    CREATE_PRODUCT: "CREATE_PRODUCT",
    UPDATE_PRODUCT: "UPDATE_PRODUCT",
    DELETE_PRODUCT: "DELETE_PRODUCT",
    IS_DELETING_PRODUCT: "IS_DELETING",
    PRODUCT_LOADING: "PRODUCT_LOADING",
    PRODUCT_ERROR: "PRODUCT_ERROR",
    
    //Product Action
    CREATE_PRODUCT_VARIANT: "CREATE_PRODUCT_VARIANT",
    UPDATE_PRODUCT_VARIANT: "UPDATE_PRODUCT_VARIANT",
    DELETE_PRODUCT_VARIANT: "DELETE_PRODUCT_VARIANT",
    IS_DELETING_PRODUCT_VARIANT: "IS_DELETING_PRODUCT_VARIANT",
    PRODUCT_VARIANT_LOADING: "PRODUCT_VARIANT_LOADING",
    PRODUCT_VARIANT_ERROR: "PRODUCT_VARIANT_ERROR",

    //------------------USER ACTION----------------------------
    //User Action
    GET_USERS: "GET_USER",
    GET_USER_BY_ID: "GET_USER_BY_ID",
    CREATE_USER: "CREATE_USER",
    UPDATE_USER: "UPDATE_USER",
    USER_LOADING: "USER_LOADING",
    USER_ERROR: "USEr_ERROR",

    //------------------ORDER ACTION----------------------------
    //Order Action
    GET_ORDERS: "GET_ORDERS",
    GET_ORDER_BY_ID: "GET_ORDER_BY_ID",
    UPDATE_ORDER_STATUS: "UPDATE_ORDER_STATUS",
    DELETE_ORDER: "DELETE_ORDER",
    ORDER_LOADING: "ORDER_LOADING",
    ORDER_ERROR: "ORDER_ERROR",

    /************************************USER ACTION***************************************/
    //Home Action:
    BLOG_CATEGORIES: "BLOG_CATEGORIES",
    BLOG: "BLOG",
    BLOG_LIST: "BLOG_LIST",
    PRODUCT_CATEGORIES: "PRODUCT_CATEGORIES",
    PRODUCT_BRANDS: "PRODUCT_BRANDS",
    PRODUCT_LIST:"PRODUCT_LIST",
    PRODUCT: "PRODUCT",
    NEW_ARRIVALS: "GET_NEW_ARRIVALS",
    LATEST_BLOGS: "GET_LATEST_BLOGS",

    //Order Action:
    ADD_ITEM: "ADD_ITEM",
    DELETE_ITEM: "DELETE_ITEM",
    UPDATE_ITEM_QUANTITY: "UPDATE_ITEM_QUANTITY",
    USER_ADD_ITEM_LOADING:"USER_ADD_ITEM_LOADING",
    USER_ADD_ITEM_ERROR:"USER_ADD_ITEM_ERROR",

    //User Profile Action
    UPDATE_PROFILE: "UPDATE_PROFILE",
    USER_PROFILE_LOADING:" USER_PROFILE_LOADING",
    USER_PROFILE_ERROR:" USER_PROFILE_ERROR",

    //User Order Action
    USER_ORDERS: "USER_ORDERS",
    USER_GET_ORDER_BY_ID: "USER_ORDER",
    GET_ORDER_AFTER_LOGIN: "GET_ORDER_AFTER_LOGIN",
    UPDATE_ORDER: "UPDATE_ORDER",
    CLEAR_ORDER: "CLEAR_ORDER",
    USER_ORDER_LOADING: "USER_ORDER_LOADING",
    USER_ORDER_ERROR: "USER_ORDER_ERROR",

    //User Auth Action
    USER_REGISTER: "USER_REGISTER",
    USER_AUTH: "USER_AUTH",
    USER_LOGOUT: "USER_LOGOUT",
    USER_AUTH_LOADING: "USER_AUTH_LOADING",
    USER_AUTH_ERROR: "USER_AUTH_ERROR",

    //Authorization Action 
    USER_INIT: "USER_INIT",
 

    ENQUEUE_SNACKBAR:'ENQUEUE_SNACKBAR',
    CLOSE_SNACKBAR:'CLOSE_SNACKBAR',
    REMOVE_SNACKBAR:'REMOVE_SNACKBAR',





}