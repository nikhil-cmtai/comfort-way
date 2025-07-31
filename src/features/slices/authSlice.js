import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_BASE_URL;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    isLoggedIn: !!localStorage.getItem("token"),
    isLoading: false,
    error: '',
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.error = '';
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = !!action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      if (!action.payload) {
        state.error = '';
      } else if (typeof action.payload === 'string') {
        state.error = action.payload;
      } else if (typeof action.payload === 'object' && action.payload !== null) {
        state.error = action.payload.message || JSON.stringify(action.payload);
      } else {
        state.error = 'An unknown error occurred.';
      }
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.error = '';
    },
  },
});

export const {
  setUser,
  setToken,
  setIsLoggedIn,
  setIsLoading,
  setError,
  clearAuth,
} = authSlice.actions;

// Register
export const register = (userData) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const newUser = {
      ...userData,
      role: "HX0obee9I27951XIW2GB", // always enforce role
    };
    const res = await axios.post(`${API}/auth/register`, newUser);
    const { token, user } = res.data;

    localStorage.setItem("token", token);
    dispatch(setToken(token));
    dispatch(setUser(user));
    return res.data;
  } catch (err) {
    dispatch(setError(
      err.response?.data?.error?.message ||
      err.response?.data?.error ||
      err.message ||
      'An error occurred'
    ));
    return null;
  } finally {
    dispatch(setIsLoading(false));
  }
};

// Login
export const login = (formData) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const res = await axios.post(`${API}/auth/login`, formData);
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    dispatch(setToken(token));
    dispatch(setUser(user));
    return res.data;
  } catch (err) {
    dispatch(setError(
      err.response?.data?.error?.message ||
      err.response?.data?.error ||
      err.message ||
      'An error occurred'
    ));
    return null;
  } finally {
    dispatch(setIsLoading(false));
  }
};

// Google Login
export const loginWithGoogle = (idToken) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const res = await axios.post(`${API}/auth/google`, { idToken });
    const { token, user } = res.data;

    localStorage.setItem("token", token);
    dispatch(setToken(token));
    dispatch(setUser(user));
    return res.data;
  } catch (err) {
    dispatch(setError(
      err.response?.data?.error?.message ||
      err.response?.data?.error ||
      err.message ||
      'An error occurred'
    ));
    return null;
  } finally {
    dispatch(setIsLoading(false));
  }
};

// Fetch User by ID
export const fetchUser = (userId) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const res = await axios.get(`${API}/auth/users/${userId}`);
    dispatch(setUser(res.data));
    return res.data;
  } catch (err) {
    dispatch(setError(
      err.response?.data?.error?.message ||
      err.response?.data?.error ||
      err.message ||
      'An error occurred'
    ));
    return null;
  } finally {
    dispatch(setIsLoading(false));
  }
};

// Get all users (admin only)
export const getAllUsers = () => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const res = await axios.get(`${API}/auth/users`);
    return res.data;
  } catch (err) {
    dispatch(setError(
      err.response?.data?.error?.message ||
      err.response?.data?.error ||
      err.message ||
      'An error occurred'
    ));
    return null;
  } finally {
    dispatch(setIsLoading(false));
  }
};

// Update user (self or admin)
export const updateUser = (userId, userData) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const res = await axios.put(`${API}/auth/users/${userId}`, userData);
    dispatch(setUser(res.data));
    return res.data;
  } catch (err) {
    dispatch(setError(
      err.response?.data?.error?.message ||
      err.response?.data?.error ||
      err.message ||
      'An error occurred'
    ));
    return null;
  } finally {
    dispatch(setIsLoading(false));
  }
};

// Delete user (self or admin)
export const deleteUser = (userId) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    await axios.delete(`${API}/auth/users/${userId}`);
    localStorage.removeItem("token");
    dispatch(clearAuth());
    return true;
  } catch (err) {
    dispatch(setError(
      err.response?.data?.error?.message ||
      err.response?.data?.error ||
      err.message ||
      'An error occurred'
    ));
    return false;
  } finally {
    dispatch(setIsLoading(false));
  }
};

// Logout
export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  dispatch(clearAuth());
};

export default authSlice.reducer;
