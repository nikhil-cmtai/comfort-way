import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productPlanSlice = createSlice({
  name: "productPlan",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
    selectedProductPlan: null,
  },
  reducers: {
    setProductPlanData: (state, action) => {
      state.data = action.payload.data;
      state.isLoading = false;
      state.error = null; 
    },
    setProductPlanLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setProductPlanError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedProductPlan: (state, action) => {
    state.selectedProductPlan = action.payload;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setProductPlanData,
  setProductPlanLoading,
  setProductPlanError,
  setSelectedProductPlan,
} = productPlanSlice.actions;


// Fetch all customers
export const fetchProductPlanData = () => async (dispatch) => {
  dispatch(setProductPlanLoading());
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + "/productPlans/getProductPlans",
    );
    dispatch(setProductPlanData(response.data));
  } catch (error) {
    dispatch(setProductPlanError(error.message));
  }
};

// Fetch product plans by category
export const fetchProductPlansByCategory = (category) => async (dispatch) => {
  dispatch(setProductPlanLoading());
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + `/productPlans/getProductPlansByCategory/${category}`,  
    );
    dispatch(setProductPlanData(response.data));
  } catch (error) {
    dispatch(setProductPlanError(error.message));
  }
};


// Fetch customer by ID
export const fetchProductPlanById = (productPlanId) => async (dispatch) => {
  dispatch(setProductPlanLoading());
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + `/productPlans/getProductPlanById/${productPlanId}`,
    );
    dispatch(setSelectedProductPlan(response.data));
  } catch (error) {
        dispatch(setProductPlanError(error.message));
  }
};

// Add a new customer
export const addProductPlan = (newProductPlan) => async (dispatch) => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_BASE_URL + "/productPlans/createProductPlan",
      newProductPlan,
    );
    dispatch(fetchProductPlanData());
    return response.data;
  } catch (error) {
    dispatch(setProductPlanError(error.message));
    return false;
  }
};

// Edit a customer
export const editProductPlan = (productPlanId, updatedData) => async (dispatch) => {
  try {
    await axios.put(
        import.meta.env.VITE_BASE_URL + `/productPlans/updateProductPlan/${productPlanId}`,
      updatedData,
    );
    dispatch(fetchProductPlanData());
    return true;
  } catch (error) {
    dispatch(setProductPlanError(error.message));
    return false;
  }
};

// Delete a customer
export const deleteProductPlan = (productPlanId) => async (dispatch) => {
  try {
    await axios.delete(
            import.meta.env.VITE_BASE_URL + `/productPlans/deleteProductPlan/${productPlanId}`,
    );
        dispatch(fetchProductPlanData());
    return true;
  } catch (error) {
    dispatch(setProductPlanError(error.message));
    return false;
  }
};

// Selectors
export const selectProductPlanData = (state) => state.productPlan.data;
export const selectProductPlanLoading = (state) => state.productPlan.isLoading;
export const selectProductPlanError = (state) => state.productPlan.error;
export const selectSelectedProductPlan = (state) => state.productPlan.selectedProductPlan;

export default productPlanSlice.reducer;
