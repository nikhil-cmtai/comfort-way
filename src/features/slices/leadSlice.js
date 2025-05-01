import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const leadSlice = createSlice({
  name: "lead",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
    selectedLead: null,
  },
  reducers: {
    setLeadData: (state, action) => {
      state.data = action.payload.data;
      state.isLoading = false;
      state.error = null; 
    },
    setLeadLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setLeadError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedLead: (state, action) => {
      state.selectedLead = action.payload;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setLeadData,
  setLeadLoading,
  setLeadError,
  setSelectedLead,
} = leadSlice.actions;


// Fetch all customers
export const fetchLeadData = () => async (dispatch) => {
  dispatch(setLeadLoading());
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + "/leads/getAllLeads",
    );
    dispatch(setLeadData(response.data.data));
  } catch (error) {
    dispatch(setLeadError(error.message));
  }
};

// Fetch customer by ID
export const fetchLeadById = (leadId) => async (dispatch) => {
  dispatch(setLeadLoading());
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + `/leads/getLeadById/${leadId}`,
    );
    dispatch(setSelectedLead(response.data.data));
  } catch (error) {
    dispatch(setLeadError(error.message));
  }
};

// Add a new customer
export const addLead = (newLead) => async (dispatch) => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_BASE_URL + "/leads/newLead",
      newLead,
    );
    dispatch(fetchLeadData());
    return response.data;
  } catch (error) {
    dispatch(setLeadError(error.message));
    return false;
  }
};

// Edit a customer
export const editLead = (leadId, updatedData) => async (dispatch) => {
  try {
    await axios.put(
      import.meta.env.VITE_BASE_URL + `/leads/updateLead/${leadId}`,
      updatedData,
    );
    dispatch(fetchLeadData());
    return true;
  } catch (error) {
    dispatch(setLeadError(error.message));
    return false;
  }
};

// Delete a customer
export const deleteLead = (leadId) => async (dispatch) => {
  try {
    await axios.delete(
        import.meta.env.VITE_BASE_URL + `/leads/deleteLead/${leadId}`,
    );
    dispatch(fetchLeadData());
    return true;
  } catch (error) {
    dispatch(setLeadError(error.message));
    return false;
  }
};

// Selectors
export const selectLeadData = (state) => state.lead.data;
export const selectLeadLoading = (state) => state.lead.isLoading;
export const selectLeadError = (state) => state.lead.error;
export const selectSelectedLead = (state) => state.lead.selectedLead;

export default leadSlice.reducer;
