import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isLoggedIn: false,
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
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setUser, setIsLoggedIn, setIsLoading, setError } = authSlice.actions;    

export const login = (formData) => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
        const response = await axios.post(import.meta.env.VITE_API_URL + "/auth/login", formData);
        dispatch(setUser(response.data));
        dispatch(setIsLoggedIn(true));
        dispatch(setIsLoading(false));
        localStorage.setItem("token", response.data.token);
        return response.data;
    } catch (error) {
        dispatch(setError(error.message));
        dispatch(setIsLoading(false));
    }
}   

export const register = (email, password, name) => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
        const response = await axios.post(import.meta.env.VITE_BASE_URL + "/auth/register", { email, password, name });
        dispatch(setUser(response.data));
        dispatch(setIsLoggedIn(true));
        dispatch(setIsLoading(false));
    } catch (error) {
        dispatch(setError(error.message));
        dispatch(setIsLoading(false));
    }
}

export const logout = () => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
        const response = await axios.post(import.meta.env.VITE_BASE_URL + "/auth/logout");
        dispatch(setUser(null));
        dispatch(setIsLoggedIn(false));
        dispatch(setIsLoading(false));
    } catch (error) {
        dispatch(setError(error.message));
        dispatch(setIsLoading(false));
    }
}

export const fetchUser = () => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
        const response = await axios.get(import.meta.env.VITE_BASE_URL + "/auth/user");
        dispatch(setUser(response.data));
        dispatch(setIsLoggedIn(true));
        dispatch(setIsLoading(false));
    } catch (error) {
        dispatch(setError(error.message));
        dispatch(setIsLoading(false));
    }
}

export const updateUser = (userData) => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
        const response = await axios.put(import.meta.env.VITE_BASE_URL + "/auth/user", userData);
        dispatch(setUser(response.data));
        dispatch(setIsLoading(false));
    } catch (error) {
        dispatch(setError(error.message));
        dispatch(setIsLoading(false));
    }
}

export const deleteUser = () => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
        const response = await axios.delete(import.meta.env.VITE_BASE_URL + "/auth/user");
        dispatch(setUser(null));
        dispatch(setIsLoggedIn(false));
        dispatch(setIsLoading(false));
    } catch (error) {
        dispatch(setError(error.message));
        dispatch(setIsLoading(false));
    }
}

export default authSlice.reducer;   