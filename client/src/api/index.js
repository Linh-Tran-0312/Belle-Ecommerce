import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL})
const api = {
    // handle blog category API
    getBlogCategories : () =>  API.get("/blog-categories"),
    createBlogCategory: (formData) => API.post("/blog-categories", formData),
    updateBlogCategory: (id, formData) => API.patch(`/blog-categories/${id}`, formData),
    deleteBlogCategory: (id) => API.delete(`/blog-categories/${id}`),

    //handle blog API
    getBlogs: (query) => API.get(`/blogs?category=${query.category}&limit=${query.limit}&page=${query.page}&search=${query.search}&sort=${query.sort}&change=${query.change}`),
    getBlogById: (id) => API.get(`/blogs/${id}`),
    createBlog: (formData) => API.post("/blogs", formData),
    updateBlog: (id,formData) => API.patch(`/blogs/${id}`, formData),
    deleteBlog: (id) => API.delete(`/blogs/${id}`)
    
}

export default api