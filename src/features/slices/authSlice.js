import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    isLoggedIn: !!localStorage.getItem("token"),
    isLoading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.error = null;
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
      state.error = action.payload;
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.error = null;
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

const setAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
  }
};

// Register
export const register = (userData) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const newUser = {
      ...userData,
      role: "user", // always enforce role
    };
    const res = await axios.post(`${API}/auth/register`, newUser);
    const { token, user } = res.data;

    localStorage.setItem("token", token);
    setAuthHeader(token);
    dispatch(setToken(token));
    dispatch(setUser(user));
    return res.data;
  } catch (err) {
    dispatch(setError(err.response?.data?.error || err.message));
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
    setAuthHeader(token);
    dispatch(setToken(token));
    dispatch(setUser(user));
    return res.data;
  } catch (err) {
    dispatch(setError(err.response?.data?.error || err.message));
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
    setAuthHeader(token);
    dispatch(setToken(token));
    dispatch(setUser(user));
    return res.data;
  } catch (err) {
    dispatch(setError(err.response?.data?.error || err.message));
    return null;
  } finally {
    dispatch(setIsLoading(false));
  }
};

// Fetch User by ID
export const fetchUser = (userId) => async (dispatch) => {
  dispatch(setIsLoading(true));
  setAuthHeader();
  try {
    const res = await axios.get(`${API}/auth/users/${userId}`);
    dispatch(setUser(res.data));
    return res.data;
  } catch (err) {
    dispatch(setError(err.response?.data?.error || err.message));
    return null;
  } finally {
    dispatch(setIsLoading(false));
  }
};

// Get all users (admin only)
export const getAllUsers = () => async (dispatch) => {
  dispatch(setIsLoading(true));
  setAuthHeader();
  try {
    const res = await axios.get(`${API}/auth/users`);
    return res.data;
  } catch (err) {
    dispatch(setError(err.response?.data?.error || err.message));
    return null;
  } finally {
    dispatch(setIsLoading(false));
  }
};

// Update user (self or admin)
export const updateUser = (userId, userData) => async (dispatch) => {
  dispatch(setIsLoading(true));
  setAuthHeader();
  try {
    const res = await axios.put(`${API}/auth/users/${userId}`, userData);
    dispatch(setUser(res.data));
    return res.data;
  } catch (err) {
    dispatch(setError(err.response?.data?.error || err.message));
    return null;
  } finally {
    dispatch(setIsLoading(false));
  }
};

// Delete user (self or admin)
export const deleteUser = (userId) => async (dispatch) => {
  dispatch(setIsLoading(true));
  setAuthHeader();
  try {
    await axios.delete(`${API}/auth/users/${userId}`);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    dispatch(clearAuth());
    return true;
  } catch (err) {
    dispatch(setError(err.response?.data?.error || err.message));
    return false;
  } finally {
    dispatch(setIsLoading(false));
  }
};

// Logout
export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
  dispatch(clearAuth());
};

export default authSlice.reducer;
