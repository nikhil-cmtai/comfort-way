import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
    selectedUser: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null; 
    },
    setUserLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setUserError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setUserData,
  setUserLoading,
  setUserError,
  setSelectedUser,
} = userSlice.actions;


// Fetch all customers
export const fetchUserData = () => async (dispatch) => {
  dispatch(setUserLoading());
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + "/auth/members",
    );
    dispatch(setUserData(response.data));
  } catch (error) {
    dispatch(setUserError(error.message));
  }
};

// Fetch all customers
export const fetchCustomers = () => async (dispatch) => {
  dispatch(setUserLoading());
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + "/auth/customers",    
    );
    dispatch(setUserData(response.data));
  } catch (error) {
    dispatch(setUserError(error.message));
  }
};


// Fetch customer by ID
export const fetchUserById = (userId) => async (dispatch) => {
  dispatch(setUserLoading());
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + `/auth/users/${userId}`,
    );
    dispatch(setSelectedUser(response.data));
  } catch (error) {
    dispatch(setUserError(error.message));
  }
};

// Add a new customer
export const addUser = (newUser) => async (dispatch) => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_BASE_URL + "/auth/newUser",
      newUser,
    );
    dispatch(fetchUserData());
    return response.data;
  } catch (error) {
    dispatch(setUserError(error.message));
    return false;
  }
};

// Edit a customer
export const editUser = (userId, updatedData) => async (dispatch) => {
  try {
    await axios.put(
        import.meta.env.VITE_BASE_URL + `/auth/users/${userId}`,
      updatedData,
    );
    dispatch(fetchUserData());
    return true;
  } catch (error) {
    dispatch(setUserError(error.message));
    return false;
  }
};

// Delete a customer
export const deleteUser = (userId) => async (dispatch) => {
  try {
    await axios.delete(
        import.meta.env.VITE_BASE_URL + `/auth/users/${userId}`,
    );
    dispatch(fetchUserData());
    return true;
  } catch (error) {
    dispatch(setUserError(error.message));
    return false;
  }
};

// Selectors
export const selectUserData = (state) => state.user.data;
export const selectUserLoading = (state) => state.user.isLoading;
export const selectUserError = (state) => state.user.error;
export const selectSelectedUser = (state) => state.user.selectedUser;

export default userSlice.reducer;
