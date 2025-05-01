import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const productSlice = createSlice({
    name: "product",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
        selectedProduct: null,
    },
    reducers: {
        setProductData: (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        setProductLoading: (state, action) => {
            state.isLoading = action.payload;
            state.error = null;
        },
        setProductError: (state, action) => {
            state.error = action.payload;
        },
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
            state.isLoading = false;
            state.error = null;
        },
    },
})

export const { setProductData, setProductLoading, setProductError, setSelectedProduct } = productSlice.actions;

export const fetchProductData = () => async (dispatch) => {
    dispatch(setProductLoading(true));
    try {
        const response = await axios.get(import.meta.env.VITE_BASE_URL + "/products/getAllProducts");
        dispatch(setProductData(response.data.data));
    } catch (error) {
        dispatch(setProductError(error.message));
    }
}

export const fetchProductByCategory = (category) => async (dispatch) => {
    dispatch(setProductLoading(true));
    try {
        const response = await axios.get(import.meta.env.VITE_BASE_URL + "/products/getProductByCategory/" + category);
        dispatch(setProductData(response.data.data));
    } catch (error) {
        dispatch(setProductError(error.message));
    }
}

export const fetchProductById = (id) => async (dispatch) => {
    dispatch(setProductLoading(true));
    try {
        const response = await axios.get(import.meta.env.VITE_BASE_URL + "/products/getProductById/" + id);
        dispatch(setSelectedProduct(response.data.data));
    } catch (error) {
        dispatch(setProductError(error.message));
    }
}

export const addProduct = (formData) => async (dispatch) => {
    dispatch(setProductLoading(true));
    try {
        const response = await axios.post(import.meta.env.VITE_BASE_URL + "/products/addProduct", 
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        dispatch(setProductData(response.data.data));
    } catch (error) {
        dispatch(setProductError(error.message));
    }
}       

export const updateProduct = (id, formData) => async (dispatch) => {
    dispatch(setProductLoading(true));
    try {
        const response = await axios.put(import.meta.env.VITE_BASE_URL + "/products/updateProduct/" + id, 
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        dispatch(setProductData(response.data.data));
    } catch (error) {
        dispatch(setProductError(error.message));
    }
}   

export const deleteProduct = (id) => async (dispatch) => {
    dispatch(setProductLoading(true));
    try {
        const response = await axios.delete(import.meta.env.VITE_BASE_URL + "/products/deleteProduct/" + id);
        dispatch(setProductData(response.data.data));
    } catch (error) {
        dispatch(setProductError(error.message));
    }
}

export const selectProductData = (state) => state.product.data;
export const selectProductLoading = (state) => state.product.isLoading;
export const selectProductError = (state) => state.product.error;
export const selectSelectedProduct = (state) => state.product.selectedProduct;

export default productSlice.reducer;