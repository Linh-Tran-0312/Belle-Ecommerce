import api from "../api";
import { ACTION, Query, MSG, SnackBar } from "../constants";
import handleFilter from "../helper/handleFilter";
import { enqueueSnackbar } from "./notification";
import errorHandler from "../helper/errorHandler";
const formProduct = (formData) => {
  const body = {
    id: formData.id,
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
  getProductSizes: () => async (dispatch) => {
    try {
      dispatch({ type: ACTION.PRODUCT_SIZE_LOADING, payload: true});
      const { data } = await api.getProductSizes();
      dispatch({ type: ACTION.GET_PRODUCT_SIZES, payload: data });
    } catch (error) {
      dispatch({ type: ACTION.PRODUCT_SIZE_LOADING, payload: false});
      errorHandler(error, dispatch)
    }
  },
  createProductSize: (formData) => async (dispatch) => {
    try {
      dispatch({ type: ACTION.PRODUCT_SIZE_LOADING, payload: true});
      const { data } = await api.createProductSize(formData);
      dispatch(enqueueSnackbar(MSG.C_PRODUCT_SIZE, SnackBar.SUCCESS))
      dispatch({ type: ACTION.CREATE_PRODUCT_SIZE, payload: data });
    } catch (error) {
      dispatch({ type: ACTION.PRODUCT_SIZE_LOADING, payload: false});
      errorHandler(error, dispatch)
    }
  },
  updateProductSize: (id, formData) => async (dispatch) => {
    try {
      dispatch({ type: ACTION.PRODUCT_SIZE_LOADING, payload: true});
      const { data } = await api.updateProductSize(id, formData);
      dispatch(enqueueSnackbar(MSG.U_PRODUCT_SIZE, SnackBar.SUCCESS))
      dispatch({ type: ACTION.UPDATE_PRODUCT_SIZE, payload: data });
    } catch (error) {
      dispatch({ type: ACTION.PRODUCT_SIZE_LOADING, payload: false});
      errorHandler(error, dispatch)
    }
  },
  deleteProductSize: (id) => async (dispatch) => {
    try {
      dispatch({ type: ACTION.PRODUCT_SIZE_LOADING, payload: true});
      await api.deleteProductSize(id);
      dispatch(enqueueSnackbar(MSG.D_PRODUCT_SIZE, SnackBar.ERROR))
      dispatch({ type: ACTION.DELETE_PRODUCT_SIZE, payload: id });
    } catch (error) {
      dispatch({ type: ACTION.PRODUCT_SIZE_LOADING, payload: false});
      errorHandler(error, dispatch)
    }
  },

  //handle product color API
  getProductColors: () => async (dispatch) => {
    try {
      dispatch({ type: ACTION.PRODUCT_COLOR_LOADING, payload: true});
      const { data } = await api.getProductColors();
      dispatch({ type: ACTION.GET_PRODUCT_COLORS, payload: data });
    } catch (error) {
      dispatch({ type: ACTION.PRODUCT_COLOR_LOADING, payload: false});
      errorHandler(error, dispatch)
    }
  },
  createProductColor: (formData) => async (dispatch) => {
    try {
      dispatch({ type: ACTION.PRODUCT_COLOR_LOADING, payload: true});
      const { data } = await api.createProductColor(formData);
      dispatch(enqueueSnackbar(MSG.C_PRODUCT_COLOR, SnackBar.SUCCESS))
      dispatch({ type: ACTION.CREATE_PRODUCT_COLOR, payload: data });
    } catch (error) {
      dispatch({ type: ACTION.PRODUCT_COLOR_LOADING, payload: false});
      errorHandler(error, dispatch)
    }
  },
  updateProductColor: (id, formData) => async (dispatch) => {
    try {
      dispatch({ type: ACTION.PRODUCT_COLOR_LOADING, payload: true});
      const { data } = await api.updateProductColor(id, formData);
      dispatch(enqueueSnackbar(MSG.U_PRODUCT_COLOR, SnackBar.SUCCESS))
      dispatch({ type: ACTION.UPDATE_PRODUCT_COLOR, payload: data });
    } catch (error) {
      dispatch({ type: ACTION.PRODUCT_COLOR_LOADING, payload: false});
      errorHandler(error, dispatch)
    }
  },
  deleteProductColor: (id) => async (dispatch) => {
    try {
      dispatch({ type: ACTION.PRODUCT_COLOR_LOADING, payload: true});
      await api.deleteProductColor(id);
      dispatch(enqueueSnackbar(MSG.D_PRODUCT_COLOR, SnackBar.ERROR))
      dispatch({ type: ACTION.DELETE_PRODUCT_COLOR, payload: id });
    } catch (error) {
      dispatch({ type: ACTION.PRODUCT_COLOR_LOADING, payload: false});
      errorHandler(error, dispatch)
    }
  },

  //handle product brand API
  getProductBrands: () => async (dispatch) => {
    try {
      dispatch({ type: ACTION.PRODUCT_BRAND_LOADING, payload: true});
      const { data } = await api.getProductBrands();
      dispatch({ type: ACTION.GET_PRODUCT_BRANDS, payload: data });
    } catch (error) {
      dispatch({ type: ACTION.PRODUCT_BRAND_LOADING, payload: false});
      errorHandler(error, dispatch)
    }
  },
  createProductBrand: (formData) => async (dispatch) => {
    try {
      dispatch({ type: ACTION.PRODUCT_BRAND_LOADING, payload: true});
      const { data } = await api.createProductBrand(formData);
      dispatch(enqueueSnackbar(MSG.C_PRODUCT_BRAND, SnackBar.SUCCESS))
      dispatch({ type: ACTION.CREATE_PRODUCT_BRAND, payload: data });
    } catch (error) {
      dispatch({ type: ACTION.PRODUCT_BRAND_LOADING, payload: false});
      errorHandler(error, dispatch)
    }
  },
  updateProductBrand: (id, formData) => async (dispatch) => {
    try {
      dispatch({ type: ACTION.PRODUCT_BRAND_LOADING, payload: true});
      const { data } = await api.updateProductBrand(id, formData);
      dispatch(enqueueSnackbar(MSG.U_PRODUCT_BRAND, SnackBar.SUCCESS))
      dispatch({ type: ACTION.UPDATE_PRODUCT_BRAND, payload: data });
    } catch (error) {
      dispatch({ type: ACTION.PRODUCT_BRAND_LOADING, payload: false});
      errorHandler(error, dispatch)
    }
  },
  deleteProductBrand: (id) => async (dispatch) => {
    try {
      dispatch({ type: ACTION.PRODUCT_BRAND_LOADING, payload: true});
      await api.deleteProductBrand(id);
      dispatch(enqueueSnackbar(MSG.D_PRODUCT_BRAND, SnackBar.ERROR))
      dispatch({ type: ACTION.DELETE_PRODUCT_BRAND, payload: id });
    } catch (error) {
      dispatch({ type: ACTION.PRODUCT_BRAND_LOADING, payload: false});
      errorHandler(error, dispatch)
    }
  },

  //handle product category API
  getProductCategories: () => async (dispatch) => {
    try {
      dispatch({ type: ACTION.PRODUCT_CATEGORY_LOADING, payload: true});
      const { data } = await api.getProductCategories();
      dispatch({ type: ACTION.GET_PRODUCT_CATEGORIES, payload: data });
    } catch (error) {
      dispatch({ type: ACTION.PRODUCT_CATEGORY_LOADING, payload: false});
      errorHandler(error, dispatch)
    }
  },
  createProductCategory: (formData) => async (dispatch) => {
    try {
      dispatch({ type: ACTION.PRODUCT_CATEGORY_LOADING, payload: true});
      const { data } = await api.createProductCategory(formData);
      dispatch(enqueueSnackbar(MSG.C_PRODUCT_CATEGORY, SnackBar.SUCCESS))
      dispatch({ type: ACTION.CREATE_PRODUCT_CATEGORY, payload: data });
    } catch (error) {
      dispatch({ type: ACTION.PRODUCT_CATEGORY_LOADING, payload: false});
      errorHandler(error, dispatch)
    }
  },
  updateProductCategory: (id, formData) => async (dispatch) => {
    try {
      dispatch({ type: ACTION.PRODUCT_CATEGORY_LOADING, payload: true});
      const { data } = await api.updateProductCategory(id, formData);
      dispatch(enqueueSnackbar(MSG.U_PRODUCT_CATEGORY, SnackBar.SUCCESS))
      dispatch({ type: ACTION.UPDATE_PRODUCT_CATEGORY, payload: data });
    } catch (error) {
      dispatch({ type: ACTION.PRODUCT_CATEGORY_LOADING, payload: false});
      errorHandler(error, dispatch)
    }
  },
  deleteProductCategory: (id) => async (dispatch) => {
    try {
      dispatch({ type: ACTION.PRODUCT_CATEGORY_LOADING, payload: true});
      await api.deleteProductCategory(id);
      dispatch(enqueueSnackbar(MSG.D_PRODUCT_CATEGORY, SnackBar.ERROR))
      dispatch({ type: ACTION.DELETE_PRODUCT_CATEGORY, payload: id });
    } catch (error) {
      dispatch({ type: ACTION.PRODUCT_CATEGORY_LOADING, payload: false});
      errorHandler(error, dispatch)
    }
  },

  //handle product and product variant API
  getProducts: (filter) => async (dispatch) => {
    try {
      dispatch({ type: ACTION.PRODUCT_LOADING});
      let queryString = "";
      queryString = handleFilter(filter);
      if (filter.min !== 0 && filter.min !== "") queryString += `&min=${filter.min}`;
      if (filter.max !== 5000 && filter.max !== "") queryString += `&max=${filter.max}`;
      switch (filter.sortMethod) {
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
      dispatch({ type: ACTION.PRODUCT_LOADING, payload: true});
      const { data } = await api.getProducts(queryString);
      dispatch({ type: ACTION.GET_PRODUCTS, payload: data })
    } catch (error) {
      dispatch({ type: ACTION.PRODUCT_LOADING, payload: false});
      errorHandler(error, dispatch)
    }
  },
  getProductById: (id) => async (dispatch) => {
    try {
      dispatch({ type: ACTION.PRODUCT_LOADING, payload: true});
      const { data } = await api.getProductById(id);
      dispatch({ type: ACTION.GET_PRODUCT_BY_ID, payload: data })
    } catch (error) {
      dispatch({ type: ACTION.PRODUCT_LOADING, payload: false});
      errorHandler(error, dispatch)
    }
  },
  createProduct: (formData) => async (dispatch) => {
    try {
      dispatch({ type: ACTION.PRODUCT_LOADING, payload: true});
      const body = formProduct(formData);
      const { data } = await api.createProduct(body);
      dispatch(enqueueSnackbar(MSG.C_PRODUCT, SnackBar.SUCCESS))
      dispatch({ type: ACTION.CREATE_PRODUCT, payload: data })
    } catch (error) {
      dispatch({ type: ACTION.PRODUCT_LOADING, payload: false});
      errorHandler(error, dispatch)
    }
  },
  updateProduct: (id, formData) => async (dispatch) => {
    try {
      dispatch({ type: ACTION.PRODUCT_LOADING, payload: true});
      const body = formProduct(formData);
      const { data } = await api.updateProduct(id, body);
      dispatch(enqueueSnackbar(MSG.U_PRODUCT, SnackBar.SUCCESS))
      dispatch({ type: ACTION.UPDATE_PRODUCT, payload: data })
    } catch (error) {
      dispatch({ type: ACTION.PRODUCT_LOADING, payload: false});
      errorHandler(error, dispatch)
    }
  },
  deleteProduct: (id) => async (dispatch) => {
    try {
      dispatch({ type: ACTION.PRODUCT_LOADING, payload: true});
      await api.deleteProduct(id);
      dispatch(enqueueSnackbar(MSG.D_PRODUCT, SnackBar.ERROR))
      dispatch({ type: ACTION.DELETE_PRODUCT, payload: id })
    } catch (error) {
      dispatch({ type: ACTION.PRODUCT_LOADING, payload: false});
      errorHandler(error, dispatch)
    }
  },
  createProductVariant: (formData) => async (dispatch) => {
    try {
      dispatch({ type: ACTION.PRODUCT_VARIANT_LOADING, payload: true});
      const body = formVariant(formData);
      const { data } = await api.createProductVariant(body);
      dispatch(enqueueSnackbar(MSG.C_PRODUCT_VARIANT, SnackBar.SUCCESS))
      dispatch({ type: ACTION.CREATE_PRODUCT_VARIANT, payload: data });
    } catch (error) {
      dispatch({ type: ACTION.PRODUCT_VARIANT_LOADING, payload: false});
      errorHandler(error, dispatch)
    }
  },
  updateProductVariant: (id, formData) => async (dispatch) => {
    try {
      dispatch({ type: ACTION.PRODUCT_VARIANT_LOADING, payload: true});
      const body = formVariant(formData);
      delete body.productId;
      const { data } = await api.updateProductVariant(id, body);
      dispatch(enqueueSnackbar(MSG.U_PRODUCT_VARIANT, SnackBar.SUCCESS))
      dispatch({ type: ACTION.UPDATE_PRODUCT_VARIANT, payload: data });
    } catch (error) {
      dispatch({ type: ACTION.PRODUCT_VARIANT_LOADING, payload: false});
      errorHandler(error, dispatch)
    }
  },
  deleteProductVariant: (id) => async (dispatch) => {
    try {
      dispatch({ type: ACTION.PRODUCT_VARIANT_LOADING, payload: true});
      await api.deleteProductVariant(id);
      dispatch(enqueueSnackbar(MSG.D_PRODUCT_VARIANT, SnackBar.ERROR))
      dispatch({ type: ACTION.DELETE_PRODUCT_VARIANT, payload: id })
    } catch (error) {
      dispatch({ type: ACTION.PRODUCT_VARIANT_LOADING, payload: false});
      errorHandler(error, dispatch)
    }
  },

}

export default productActions