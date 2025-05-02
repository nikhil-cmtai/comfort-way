import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const protectionSlice = createSlice({
  name: "protectionPlan",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
    selectedProtection: null,
  },
  reducers: {
    setProtectionData: (state, action) => {
      state.data = action.payload.data;
      state.isLoading = false;
      state.error = null; 
    },
    setProtectionLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setProtectionError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedProtection: (state, action) => {
    state.selectedProtection = action.payload;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setProtectionData,
  setProtectionLoading,
  setProtectionError,
  setSelectedProtection,
} = protectionSlice.actions;


// Fetch all customers
export const fetchProtectionData = () => async (dispatch) => {
  dispatch(setProtectionLoading());
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + "/protectionPlans/getProtectionPlans",
    );
    dispatch(setProtectionData(response.data));
  } catch (error) {
    dispatch(setProtectionError(error.message));
  }
};

// Fetch customer by ID
export const fetchProtectionById = (protectionId) => async (dispatch) => {
  dispatch(setProtectionLoading());
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + `/protectionPlans/getProtectionPlanById/${protectionId}`,
    );
    dispatch(setSelectedProtection(response.data));
  } catch (error) {
        dispatch(setProtectionError(error.message));
  }
};

// Add a new customer
export const addProtectionPlan = (newProtectionPlan) => async (dispatch) => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_BASE_URL + "/protectionPlans/createProtectionPlan",
      newProtectionPlan,
    );
    dispatch(fetchProtectionData());
    return response.data;
  } catch (error) {
    dispatch(setProtectionError(error.message));
    return false;
  }
};

// Edit a customer
export const editProtectionPlan = (protectionId, updatedData) => async (dispatch) => {
  try {
    await axios.put(
      import.meta.env.VITE_BASE_URL + `/protectionPlans/updateProtectionPlan/${protectionId}`,
      updatedData,
    );
    dispatch(fetchProtectionData());
    return true;
  } catch (error) {
    dispatch(setProtectionError(error.message));
    return false;
  }
};

// Delete a customer
export const deleteProtectionPlan = (protectionId) => async (dispatch) => {
  try {
    await axios.delete(
        import.meta.env.VITE_BASE_URL + `/protectionPlans/deleteProtectionPlan/${protectionId}`,
    );
    dispatch(fetchProtectionData());
    return true;
  } catch (error) {
    dispatch(setProtectionError(error.message));
    return false;
  }
};

// Selectors
export const selectProtectionData = (state) => state.protectionPlan.data;
export const selectProtectionLoading = (state) => state.protectionPlan.isLoading;
export const selectProtectionError = (state) => state.protectionPlan.error;
export const selectSelectedProtection = (state) => state.protectionPlan.selectedProtection;

export default protectionSlice.reducer;
