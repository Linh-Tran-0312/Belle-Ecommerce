import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL})
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
    deleteProductVariant: (variantId) => API.delete(`/products/variant/${variantId}`)

}

export default api;