import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const serviceHistorySlice = createSlice({
  name: "serviceHistory",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
    selectedServiceHistory: null,
  },
  reducers: {
    setServiceHistoryData: (state, action) => {
      state.data = action.payload.data;
      state.isLoading = false;
      state.error = null; 
    },
    setServiceHistoryLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setServiceHistoryError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedServiceHistory: (state, action) => {
      state.selectedServiceHistory = action.payload;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setServiceHistoryData,
  setServiceHistoryLoading,
  setServiceHistoryError,
  setSelectedServiceHistory,
} = serviceHistorySlice.actions;


// Fetch all service histories
export const fetchServiceHistoryData = () => async (dispatch) => {
  dispatch(setServiceHistoryLoading());
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + "/serviceHistory/getServiceHistories",
    );
    dispatch(setServiceHistoryData(response.data));
  } catch (error) {
    dispatch(setServiceHistoryError(error.message));
  }
};

// Fetch service history by ID
export const fetchServiceHistoryById = (serviceHistoryId) => async (dispatch) => {
  dispatch(setServiceHistoryLoading());
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + `/serviceHistory/getServiceHistoryById/${serviceHistoryId}`,
    );
    dispatch(setSelectedServiceHistory(response.data));
  } catch (error) {
    dispatch(setServiceHistoryError(error.message));
  }
};

// Fetch all service histories by user ID
export const fetchServiceHistoriesByUserId = (userId) => async (dispatch) => {
  dispatch(setServiceHistoryLoading());
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + `/serviceHistory/getServiceHistoryByUserId/${userId}`,
    );
    dispatch(setServiceHistoryData(response.data));
  } catch (error) {
    dispatch(setServiceHistoryError(error.message));
  }
};

// Add a new service history
export const addServiceHistory = (newServiceHistory) => async (dispatch) => {
  try {
    const response = await axios.post(
        import.meta.env.VITE_BASE_URL + "/serviceHistory/createServiceHistory",
      newServiceHistory,
    );
    dispatch(fetchServiceHistoryData());
    return response.data;
  } catch (error) {
    dispatch(setServiceHistoryError(error.message));
    return false;
  }
};

// Edit a service history
export const editServiceHistory = (serviceHistoryId, updatedData) => async (dispatch) => {
  try {
    await axios.put(
        import.meta.env.VITE_BASE_URL + `/serviceHistory/updateServiceHistory/${serviceHistoryId}`,
      updatedData,
    );
        dispatch(fetchServiceHistoryData());
    return true;
  } catch (error) {
    dispatch(setServiceHistoryError(error.message));
    return false;
  }
};

// Delete a service history
export const deleteServiceHistory = (serviceHistoryId) => async (dispatch) => {
  try {
    await axios.delete(
        import.meta.env.VITE_BASE_URL + `/serviceHistory/deleteServiceHistory/${serviceHistoryId}`,
    );
    dispatch(fetchServiceHistoryData());
    return true;
  } catch (error) {
    dispatch(setServiceHistoryError(error.message));
    return false;
  }
};

// Selectors
export const selectServiceHistoryData = (state) => state.serviceHistory.data;
export const selectServiceHistoryLoading = (state) => state.serviceHistory.isLoading;
export const selectServiceHistoryError = (state) => state.serviceHistory.error;
export const selectSelectedServiceHistory = (state) => state.serviceHistory.selectedServiceHistory;

export default serviceHistorySlice.reducer;
