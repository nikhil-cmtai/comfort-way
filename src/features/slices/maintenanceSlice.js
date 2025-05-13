import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const maintenanceRequestSlice = createSlice({
  name: "maintenanceRequest",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
    selectedMaintenanceRequest: null,
  },
  reducers: {
    setMaintenanceRequestData: (state, action) => {
      state.data = action.payload.data;
      state.isLoading = false;
      state.error = null; 
    },
    setMaintenanceRequestLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setMaintenanceRequestError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedMaintenanceRequest: (state, action) => {
      state.selectedMaintenanceRequest = action.payload;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setMaintenanceRequestData,
  setMaintenanceRequestLoading,
  setMaintenanceRequestError,
  setSelectedMaintenanceRequest,
} = maintenanceRequestSlice.actions;


// Fetch all customers
export const fetchMaintenanceRequestData = () => async (dispatch) => {
  dispatch(setMaintenanceRequestLoading());
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + "/maintenances/getAllRequests",
    );
    dispatch(setMaintenanceRequestData(response.data));
  } catch (error) {
    dispatch(setMaintenanceRequestError(error.message));
  }
};

// Fetch customer by ID
export const fetchMaintenanceRequestById = (maintenanceRequestId) => async (dispatch) => {
  dispatch(setMaintenanceRequestLoading());
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + `/maintenances/getRequestById/${maintenanceRequestId}`,
    );
    dispatch(setSelectedMaintenanceRequest(response.data));
  } catch (error) {
    dispatch(setMaintenanceRequestError(error.message));
  }
};

// Add a new customer
export const addMaintenanceRequest = (newMaintenanceRequest) => async (dispatch) => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_BASE_URL + "/maintenances/newRequest",
      newMaintenanceRequest,
    );
    dispatch(fetchMaintenanceRequestData());
    return response.data;
  } catch (error) {
    dispatch(setMaintenanceRequestError(error.message));
    return false;
  }
};

// Edit a customer
export const editMaintenanceRequest = (maintenanceRequestId, updatedData) => async (dispatch) => {
  try {
    await axios.put(
      import.meta.env.VITE_BASE_URL + `/maintenances/updateRequest/${maintenanceRequestId}`,
      updatedData,
    );
    dispatch(fetchMaintenanceRequestData());
    return true;
  } catch (error) {
    dispatch(setMaintenanceRequestError(error.message));
    return false;
  }
};

// Delete a customer
export const deleteMaintenanceRequest = (maintenanceRequestId) => async (dispatch) => {
  try {
    await axios.delete(
      import.meta.env.VITE_BASE_URL + `/maintenances/deleteRequest/${maintenanceRequestId}`,
    );
    dispatch(fetchMaintenanceRequestData());
    return true;
  } catch (error) {
    dispatch(setMaintenanceRequestError(error.message));
    return false;
  }
};

// Selectors
export const selectMaintenanceRequestData = (state) => state.maintenanceRequest.data;
export const selectMaintenanceRequestLoading = (state) => state.maintenanceRequest.isLoading;
export const selectMaintenanceRequestError = (state) => state.maintenanceRequest.error;
export const selectSelectedMaintenanceRequest = (state) => state.maintenanceRequest.selectedMaintenanceRequest;

export default maintenanceRequestSlice.reducer;
