import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL})
const api = {
    getBlogCategories : () =>  API.get("/blog-categories"),
    createBlogCategory: (formData) => API.post("/blog-categories", formData),
    updateBlogCategory: (id, formData) => API.patch(`/blog-categories/${id}`, formData),
    deleteBlogCategory: (id) => API.delete(`/blog-categories/${id}`)
    
}

export default api