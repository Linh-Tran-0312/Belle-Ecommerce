import api from "../api";
import { ACTION, Query } from "../constants";

const productActions = {
  //handle product size API
  getProductSizes: () => async(dispatch) => {
      try {
          const { data } = await api.getProductSizes();
          dispatch({ type: ACTION.GET_PRODUCT_SIZES, payload: data});
      } catch (error) {
          dispatch({ type: ACTION.ERROR, payload: error.message});
      }
  },
  createProductSize: (formData) => async(dispatch) => {
    try {
        const { data } = await api.createProductSize(formData);
        dispatch({ type: ACTION.CREATE_PRODUCT_SIZE, payload: data});
    } catch (error) {
        dispatch({ type: ACTION.ERROR, payload: error.message});
    }
  },
  updateProductSize: (id,formData) => async(dispatch) => {
    try {
        const { data } = await api.updateProductSize(id,formData);
        dispatch({ type: ACTION.UPDATE_PRODUCT_SIZE, payload: data});
    } catch (error) {
        dispatch({ type: ACTION.ERROR, payload: error.message});
    }
},
  deleteProductSize: (id) => async(dispatch) => {
    try {
        dispatch({ type: ACTION.IS_DELETING_PRODUCT_SIZE })
        await api.deleteProductSize(id);
        dispatch({ type: ACTION.DELETE_PRODUCT_SIZE });
    } catch (error) {
        dispatch({ type: ACTION.ERROR, payload: error.message});
    }
},

  //handle product color API
  getProductColors: () => async(dispatch) => {
    try {
        const { data } = await api.getProductColors();
        dispatch({ type: ACTION.GET_PRODUCT_COLORS, payload: data});
    } catch (error) {
        dispatch({ type: ACTION.ERROR, payload: error.message});
    }
},
  createProductColor: (formData) => async(dispatch) => {
    try {
        const { data } = await api.createProductColor(formData);
        dispatch({ type: ACTION.CREATE_PRODUCT_COLOR, payload: data});
    } catch (error) {
        dispatch({ type: ACTION.ERROR, payload: error.message});
    }
},
  updateProductColor: (id,formData) => async(dispatch) => {
    try {
        const { data } = await api.updateProductColor(id,formData);
        dispatch({ type: ACTION.UPDATE_PRODUCT_COLOR, payload: data});
    } catch (error) {
        dispatch({ type: ACTION.ERROR, payload: error.message});
    }
},
  deleteProductColor: (id) => async(dispatch) => {
    try {
        dispatch({ type: ACTION.IS_DELETING_PRODUCT_COLOR })
        await api.deleteProductSize(id);
        dispatch({ type: ACTION.DELETE_PRODUCT_COLOR });
    } catch (error) {
        dispatch({ type: ACTION.ERROR, payload: error.message});
    }
},

  //handle product brand API
  getProductBrands: () => async(dispatch) => {
    try {
        const { data } = await api.getProductBrands();
        dispatch({ type: ACTION.GET_PRODUCT_BRANDS, payload: data});
    } catch (error) {
        dispatch({ type: ACTION.ERROR, payload: error.message});
    }
},
  createProductBrand: (formData) => async(dispatch) => {
    try {
        const { data } = await api.createProductBrand(formData);
        dispatch({ type: ACTION.CREATE_PRODUCT_BRAND, payload: data});
    } catch (error) {
        dispatch({ type: ACTION.ERROR, payload: error.message});
    }
},
  updateProductBrand: (id,formData) => async(dispatch) => {
    try {
        const { data } = await api.updateProductBrand(id,formData);
        dispatch({ type: ACTION.UPDATE_PRODUCT_BRAND, payload: data});
    } catch (error) {
        dispatch({ type: ACTION.ERROR, payload: error.message});
    }
},
  deleteProductBrand: (id) => async(dispatch) => {
    try {
        dispatch({ type: ACTION.IS_DELETING_PRODUCT_BRAND })
        await api.deleteProductBrand(id);
        dispatch({ type: ACTION.DELETE_PRODUCT_BRAND });
    } catch (error) {
        dispatch({ type: ACTION.ERROR, payload: error.message});
    }
},

  //handle product category API
  getProductCategories: () => async(dispatch) => {
    try {
        const { data } = await api.getProductCategories();
        dispatch({ type: ACTION.GET_PRODUCT_CATEGORIES, payload: data});
    } catch (error) {
        dispatch({ type: ACTION.ERROR, payload: error.message});
    }
},
  createProductCategory: (formData) => async(dispatch) => {
    try {
        const { data } = await api.createProductCategory(formData);
        dispatch({ type: ACTION.CREATE_PRODUCT_CATEGORY, payload: data});
    } catch (error) {
        dispatch({ type: ACTION.ERROR, payload: error.message});
    }
},
  updateProductCategory: (id,formData) => async(dispatch) => {
    try {
        const { data } = await api.createProductCategory(id,formData);
        dispatch({ type: ACTION.UPDATE_PRODUCT_CATEGORY, payload: data});
    } catch (error) {
        dispatch({ type: ACTION.ERROR, payload: error.message});
    }
},
  deleteProductCategory: (id) => async(dispatch) => {
    try {
        dispatch({ type: ACTION.IS_DELETING_PRODUCT_CATEGORY })
        await api.deleteProductCategory(id);
        dispatch({ type: ACTION.DELETE_PRODUCT_CATEGORY });
    } catch (error) {
        dispatch({ type: ACTION.ERROR, payload: error.message});
    }
},

  //handle product and product variant API
  getProducts: (queryString) => async(dispatch) => {
    try {
        
    } catch (error) {
        
    }
},
  getProductById: (id) =>  async(dispatch) => {
    try {
        
    } catch (error) {
        
    }
},
  createProduct: (formData) =>async(dispatch) => {
    try {
        
    } catch (error) {
        
    }
},
  updateProduct: (id,formData) => async(dispatch) => {
    try {
        
    } catch (error) {
        
    }
},
  deleteProduct: (id) => async(dispatch) => {
    try {
        
    } catch (error) {
        
    }
},
  createProductVariant: (formData) => async(dispatch) => {
    try {
        
    } catch (error) {
        
    }
},
  updateProductVariant: (id, formData) => async(dispatch) => {
    try {
        
    } catch (error) {
        
    }
},
  deleteProductVariant: (id) => async(dispatch) => {
    try {
        
    } catch (error) {
        
    }
},

}

export default productActions