import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const categorySlice = createSlice({
    name: "category",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
        selectedCategory: null,
    },
    reducers: {
        setCategoryData: (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        setCategoryLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setCategoryError: (state, action) => {
            state.error = action.payload;
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
    },
})

export const { setCategoryData, setCategoryLoading, setCategoryError, setSelectedCategory } = categorySlice.actions;

export const fetchCategoryData = () => async (dispatch) => {
    dispatch(setCategoryLoading(true));
    try {
        const response = await axios.get(import.meta.env.VITE_BASE_URL + "/categories/getAllCategories");
        dispatch(setCategoryData(response.data.data));
    } catch (error) {
        dispatch(setCategoryError(error.message));
    }
}

export const fetchCategoryById = (id) => async (dispatch) => {
    dispatch(setCategoryLoading(true));
    try {
        const response = await axios.get(import.meta.env.VITE_BASE_URL + "/categories/getCategoryById/" + id);
        dispatch(setSelectedCategory(response.data.data));
    } catch (error) {
        dispatch(setCategoryError(error.message));
    }
}

export const fetchCategoryByName = (name) => async (dispatch) => {
    dispatch(setCategoryLoading(true));
    try {
        const response = await axios.get(import.meta.env.VITE_BASE_URL + "/categories/getCategoryByName/" + name);
        dispatch(setSelectedCategory(response.data.data));
    } catch (error) {
        dispatch(setCategoryError(error.message));
    }
}       

export const addCategory = (formData) => async (dispatch) => {
    dispatch(setCategoryLoading(true));
    try {
        const response = await axios.post(import.meta.env.VITE_BASE_URL + "/categories/addCategory", 
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        dispatch(setCategoryData(response.data.data));
    } catch (error) {
        dispatch(setCategoryError(error.message));
    }
}       

export const updateCategory = (id, formData) => async (dispatch) => {
    dispatch(setCategoryLoading(true));
    try {
        const response = await axios.put(import.meta.env.VITE_BASE_URL + "/categories/updateCategory/" + id, 
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
    } catch (error) {
        dispatch(setCategoryError(error.message));
    }
}   

export const deleteCategory = (id) => async (dispatch) => {
    dispatch(setCategoryLoading(true));
    try {
        const response = await axios.delete(import.meta.env.VITE_BASE_URL + "/categories/deleteCategory/" + id);
        dispatch(setCategoryData(response.data.data));
    } catch (error) {
        dispatch(setCategoryError(error.message));
    }
}

export const selectCategoryData = (state) => state.category.data;
export const selectCategoryLoading = (state) => state.category.isLoading;
export const selectCategoryError = (state) => state.category.error;
export const selectSelectedCategory = (state) => state.category.selectedCategory;

export default categorySlice.reducer;