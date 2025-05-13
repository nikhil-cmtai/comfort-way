import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const purchasedPlanSlice = createSlice({
  name: "purchasedPlan",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
    selectedPurchasedPlan: null,
  },
  reducers: {
    setPurchasedPlanData: (state, action) => {
      state.data = action.payload.data;
      state.isLoading = false;
      state.error = null; 
    },
    setPurchasedPlanLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setPurchasedPlanError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedPurchasedPlan: (state, action) => {
      state.selectedPurchasedPlan = action.payload;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setPurchasedPlanData,
  setPurchasedPlanLoading,
  setPurchasedPlanError,
  setSelectedPurchasedPlan,
} = purchasedPlanSlice.actions;


// Fetch all purchased plans
export const fetchPurchasedPlanData = () => async (dispatch) => {
  dispatch(setPurchasedPlanLoading());
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + "/purchasedPlans/getAllPurchasedPlans",
    );
    dispatch(setPurchasedPlanData(response.data));
  } catch (error) {
    dispatch(setPurchasedPlanError(error.message));
  }
};

// Fetch purchased plan by ID
export const fetchPurchasedPlanById = (purchasedPlanId) => async (dispatch) => {
  dispatch(setPurchasedPlanLoading());
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + `/purchasedPlans/getPurchasedPlanById/${purchasedPlanId}`,
    );
    dispatch(setSelectedPurchasedPlan(response.data));
  } catch (error) {
    dispatch(setPurchasedPlanError(error.message));
  }
};

// Fetch all purchased plans by user ID
export const fetchPurchasedPlansByUserId = (userId) => async (dispatch) => {
  dispatch(setPurchasedPlanLoading());
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + `/purchasedPlans/getPurchasedPlansByUserId/${userId}`,
    );
    dispatch(setPurchasedPlanData(response.data));
  } catch (error) {
    dispatch(setPurchasedPlanError(error.message));
  }
};

// Add a new purchased plan
export const addPurchasedPlan = (newPurchasedPlan) => async (dispatch) => {
  try {
    const response = await axios.post(
        import.meta.env.VITE_BASE_URL + "/purchasedPlans/newPurchasedPlan",
      newPurchasedPlan,
    );
    dispatch(fetchPurchasedPlanData());
    return response.data;
  } catch (error) {
    dispatch(setPurchasedPlanError(error.message));
    return false;
  }
};

// Edit a purchased plan
export const editPurchasedPlan = (purchasedPlanId, updatedData) => async (dispatch) => {
  try {
    await axios.put(
        import.meta.env.VITE_BASE_URL + `/purchasedPlans/updatePurchasedPlan/${purchasedPlanId}`,
      updatedData,
    );
        dispatch(fetchPurchasedPlanData());
    return true;
  } catch (error) {
    dispatch(setPurchasedPlanError(error.message));
    return false;
  }
};

// Delete a purchased plan
export const deletePurchasedPlan = (purchasedPlanId) => async (dispatch) => {
  try {
    await axios.delete(
        import.meta.env.VITE_BASE_URL + `/purchasedPlans/deletePurchasedPlan/${purchasedPlanId}`,
    );
    dispatch(fetchPurchasedPlanData());
    return true;
  } catch (error) {
    dispatch(setPurchasedPlanError(error.message));
    return false;
  }
};

// Selectors
export const selectPurchasedPlanData = (state) => state.purchasedPlan.data;
export const selectPurchasedPlanLoading = (state) => state.purchasedPlan.isLoading;
export const selectPurchasedPlanError = (state) => state.purchasedPlan.error;
export const selectSelectedPurchasedPlan = (state) => state.purchasedPlan.selectedPurchasedPlan;

export default purchasedPlanSlice.reducer;
