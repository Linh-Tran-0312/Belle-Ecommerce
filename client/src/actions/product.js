import api from "../api";
import { ACTION, Query } from "../constants";

const formProduct = (formData) => {
   const body = {
    name: formData.name,
    categoryId: formData.categoryId,
    brandId: formData.brandId,
    price: formData.price,
    sku: formData.sku,
    summary: formData.summary,
    description: formData.description,
    imgPaths: formData.imgPaths
  }
  return body;
}
const formVariant = (formData) => {
  const body = {
   productId: formData.productId,
   colorId: formData.colorId,
   sizeId: formData.sizeId,
   quantity: formData.quantity
 }
 return body;
}


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
        dispatch({ type: ACTION.DELETE_PRODUCT_SIZE, payload: id  });
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
        await api.deleteProductColor(id);
        dispatch({ type: ACTION.DELETE_PRODUCT_COLOR, payload: id  });
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
        dispatch({ type: ACTION.DELETE_PRODUCT_BRAND, payload: id  });
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
        const { data } = await api.updateProductCategory(id,formData);
        dispatch({ type: ACTION.UPDATE_PRODUCT_CATEGORY, payload: data});
    } catch (error) {
        dispatch({ type: ACTION.ERROR, payload: error.message});
    }
},
  deleteProductCategory: (id) => async(dispatch) => {
    try {
        dispatch({ type: ACTION.IS_DELETING_PRODUCT_CATEGORY })
        await api.deleteProductCategory(id);
        dispatch({ type: ACTION.DELETE_PRODUCT_CATEGORY, payload: id });
    } catch (error) {
        dispatch({ type: ACTION.ERROR, payload: error.message});
    }
},

  //handle product and product variant API
  getProducts: (filter) => async(dispatch) => {
    try {
      let queryString = "";
      if(filter.category) queryString += `category=${filter.category}`;
      if(filter.brand) queryString += `brand=${filter.brand}`;
      if(filter.search) queryString += `&search=${filter.search}`;
      if(filter.limit) queryString += `&limit=${filter.limit}`;
      if(filter.page) queryString += `&page=${filter.page}`;
      if(filter.min !== 0 && filter.min !== "") queryString += `&min=${filter.min}`;
      if(filter.max !== 5000 && filter.max !== "") queryString += `&max=${filter.max}`;
      switch(filter.sortMethod) {
          case "1":
              queryString += `&sort=price&change=${Query.ASC}`;
              break;
          case "2":
              queryString += `&sort=price&change=${Query.DESC}`;
              break;
          case "3":
              queryString += `&sort=name&change=${Query.ASC}`;
              break;
          case "4":
              queryString += `&sort=name&change=${Query.DESC}`;
              break;
          default:
              break;
      }
      const { data } = await api.getProducts(queryString);
      dispatch({type: ACTION.GET_PRODUCTS, payload: data})
    } catch (error) {
      dispatch({ type: ACTION.ERROR, payload: error.message});
    }
},
  getProductById: (id) =>  async(dispatch) => {
    try {
        const { data } = await api.getProductById(id);
        console.log(data);
        dispatch({type: ACTION.GET_PRODUCT_BY_ID, payload: data})
    } catch (error) {
      dispatch({ type: ACTION.ERROR, payload: error.message});
    }
},
  createProduct: (formData) =>async(dispatch) => {
    try {
        const body = formProduct(formData);
        const { data } = await api.createProduct(body);
        dispatch({ type: ACTION.CREATE_PRODUCT, payload: data})
    } catch (error) {
      dispatch({ type: ACTION.ERROR, payload: error.message});
    }
},
  updateProduct: (id,formData) => async(dispatch) => {
    try {
      const body = formProduct(formData);
      const { data } = await api.updateProduct(id,body);
      dispatch({ type: ACTION.UPDATE_PRODUCT, payload: data})
    } catch (error) {
      dispatch({ type: ACTION.ERROR, payload: error.message});
    }
},
  deleteProduct: (id) => async(dispatch) => {
    try {
      dispatch({ type: ACTION.IS_DELETING_PRODUCT })
        await api.deleteProduct(id);
        dispatch({ type: ACTION.DELETE_PRODUCT, payload: id})
    } catch (error) {
      dispatch({ type: ACTION.ERROR, payload: error.message});
    }
},
  createProductVariant: (formData) => async(dispatch) => {
    try {
        const body = formVariant(formData);
        console.log(body);
        const { data } = await api.createProductVariant(body);
        dispatch({ type: ACTION.CREATE_PRODUCT_VARIANT, payload: data});
    } catch (error) {
      dispatch({ type: ACTION.ERROR, payload: error.message});
    }
},
  updateProductVariant: (id, formData) => async(dispatch) => {
    try {
      const body = formVariant(formData);
      delete body.productId;
      const { data } = await api.updateProductVariant(id,body);
      dispatch({ type: ACTION.UPDATE_PRODUCT_VARIANT, payload: data});

    } catch (error) {
      dispatch({ type: ACTION.ERROR, payload: error.message});
    }
},
  deleteProductVariant: (id) => async(dispatch) => {
    try {
      dispatch({ type: ACTION.IS_DELETING_PRODUCT_VARIANT })
        await api.deleteProductVariant(id);
        dispatch({type: ACTION.DELETE_PRODUCT_VARIANT, payload: id})
    } catch (error) {
      dispatch({ type: ACTION.ERROR, payload: error.message});
    }
},

}

export default productActions