import API from "./axiosConfig";

const api = {
     
    //------------------------BLOG API----------------------------
    // handle blog category API
    getBlogCategories : () =>  API.get("/blog-categories"),
    createBlogCategory: (formData) => API.post("/blog-categories", formData),
    updateBlogCategory: (id, formData) => API.patch(`/blog-categories/${id}`, formData),
    deleteBlogCategory: (id) => API.delete(`/blog-categories/${id}`),

    //handle blog API
    getBlogs: (queryString) => API.get(`/blogs?${queryString}`),
    getBlogById: (id) => API.get(`/blogs/${id}`),
    createBlog: (formData) => API.post("/blogs", formData),
    updateBlog: (id,formData) => API.patch(`/blogs/${id}`, formData),
    deleteBlog: (id) => API.delete(`/blogs/${id}`),

    //------------------------PRODUCT API----------------------------

    //handle product size API
    getProductSizes: () => API.get("/sizes"),
    createProductSize: (formData) => API.post("/sizes", formData),
    updateProductSize: (id,formData) => API.patch(`/sizes/${id}`, formData),
    deleteProductSize: (id) => API.delete(`/sizes/${id}`),

    //handle product color API
    getProductColors: () => API.get("/colors"),
    createProductColor: (formData) => API.post("/colors", formData),
    updateProductColor: (id,formData) => API.patch(`/colors/${id}`, formData),
    deleteProductColor: (id) => API.delete(`/colors/${id}`),

    //handle product brand API
    getProductBrands: () => API.get("/brands"),
    createProductBrand: (formData) => API.post("/brands", formData),
    updateProductBrand: (id,formData) => API.patch(`/brands/${id}`, formData),
    deleteProductBrand: (id) => API.delete(`/brands/${id}`),

    //handle product category API
    getProductCategories: () => API.get("/product-categories"),
    createProductCategory: (formData) => API.post("/product-categories", formData),
    updateProductCategory: (id,formData) => API.patch(`/product-categories/${id}`, formData),
    deleteProductCategory: (id) => API.delete(`/product-categories/${id}`),

    //handle product and product variant API
    getProducts: (queryString) => API.get(`/products?${queryString}`),
    getProductById: (id) =>  API.get(`/products/${id}`),
    createProduct: (formData) => API.post("/products", formData),
    updateProduct: (id,formData) => API.patch(`/products/${id}`, formData),
    deleteProduct: (id) => API.delete(`/products/${id}`),
    createProductVariant: (formData) => API.post("/products/variant", formData),
    updateProductVariant: (variantId, formData) => API.patch(`/products/variant/${variantId}`, formData),
    deleteProductVariant: (variantId) => API.delete(`/products/variant/${variantId}`),

    //------------------------USER API----------------------------
    //For Admin permission

    getUsers: (queryString) => API.get(`/users?${queryString}`),
    getUserById: (id) => API.get(`/users/${id}`),
    createUser: (formData) => API.post("/users", formData),
    updateUser: (id, formData) => API.patch(`/users/${id}`, formData),

    //------------------------AUTHORIZATION API----------------------------
    register: (formData) => API.post("/auth/user/register", formData),
    login: (formData) => API.post("/auth/user/login", formData),
    adminLogin: (formData) => API.post("/auth/admin/login", formData),
    logout: () => API.get("/auth/logout"),
    getAdminProfile: () => API.get("/auth/admin"),
    getUserProfile: () => API.get("/auth/user"),

    //------------------------ORDER API----------------------------
    getOrders: (queryString) => API.get(`/orders?${queryString}`),
    getOrderById: (id) => API.get(`/orders/${id}`),
    getOrdersByUserId: (userId) => API.get(`/orders/${userId}/all`),
    updateOrderStatus: (id, formData) => API.patch(`/orders/${id}/updateStatus`, formData),
    deleteOrder: (id) => API.delete(`/orders/${id}`),

    getCurrentOrderByUserId: (userId) =>  API.get(`/orders/${userId}/current`),
    addItemToOrder: (id, formData) => API.post(`/orders/${id}/items`, formData),
    createOrder: (formData) => API.post("/orders", formData),
    deleteItem: (orderId,itemId) => API.delete(`/orders/${orderId}/items/${itemId}`),
    updateItemQuantity: (orderId, itemId, formData) => API.patch(`/orders/${orderId}/items/${itemId}`, formData),
    placeOrder: (orderId, formData) => API.patch(`/orders/${orderId}/place`, formData),
    //update cart after login
    updateOrderAfterLogin: (userId,formData) => API.patch(`/orders/${userId}/afterLogin`, formData),

     //------------------------REPORT API----------------------------
    getOverviewReport: () => API.get("/report/overview"),
    getSalesReport: (time) => API.get(`/report/sales?time=${time}`),
    getOrderReport: (time) => API.get(`/report/orders?time=${time}`),
    getProductReport: (time, queryStr) => API.get(`/report/products?time=${time}&${queryStr}`),

    //------------------------REVIEW API----------------------------
    getReviewsByProductId: (productId, size, cursor) => API.get(`/reviews/${productId}?size=${size}&cursor=${cursor}`),
    getReviewCount: (productId) => API.get(`/reviews/${productId}/count`),
    createReview: (formData) => API.post("/reviews", formData)
}

export default api;