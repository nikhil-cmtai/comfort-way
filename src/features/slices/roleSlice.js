import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const roleSlice = createSlice({
  name: "role",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
    selectedRole: null,
  },
  reducers: {
    setRoleData: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null; 
    },
    setRoleLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setRoleError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedRole: (state, action) => {
      state.selectedRole = action.payload;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setRoleData,
  setRoleLoading,
  setRoleError,
  setSelectedRole,
} = roleSlice.actions;


// Fetch all customers
export const fetchRoleData = () => async (dispatch) => {
  dispatch(setRoleLoading());
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + "/roles/getAllRoles",
    );
    dispatch(setRoleData(response.data.data));
  } catch (error) {
    dispatch(setRoleError(error.message));
  }
};

// Fetch customer by ID
export const fetchRoleById = (roleId) => async (dispatch) => {
  dispatch(setRoleLoading());
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + `/roles/getRoleById/${roleId}`,
    );
    dispatch(setSelectedRole(response.data.data));
  } catch (error) {
    dispatch(setRoleError(error.message));
  }
};

// Add a new customer
export const addRole = (newRole) => async (dispatch) => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_BASE_URL + "/roles/newRole",
      newRole,
    );
    dispatch(fetchRoleData());
    return response.data;
  } catch (error) {
      dispatch(setRoleError(error.message));
    return false;
  }
};

// Edit a customer
export const editRole = (roleId, updatedData) => async (dispatch) => {
  try {
    await axios.put(
      import.meta.env.VITE_BASE_URL + `/roles/updateRole/${roleId}`,
      updatedData,
    );
    dispatch(fetchRoleData());
    return true;
  } catch (error) {
    dispatch(setRoleError(error.message));
    return false;
  }
};

// Delete a customer
export const deleteRole = (roleId) => async (dispatch) => {
  try {
    await axios.delete(
        import.meta.env.VITE_BASE_URL + `/roles/deleteRole/${roleId}`,
    );
    dispatch(fetchRoleData());
    return true;
  } catch (error) {
    dispatch(setRoleError(error.message));
    return false;
  }
};

// Selectors
export const selectRoleData = (state) => state.role.data;
export const selectRoleLoading = (state) => state.role.isLoading;
export const selectRoleError = (state) => state.role.error;
export const selectSelectedRole = (state) => state.role.selectedRole;

export default roleSlice.reducer;
