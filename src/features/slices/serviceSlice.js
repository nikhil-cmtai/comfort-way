import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const serviceSlice = createSlice({
    name: "service",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
        selectedService: null,
    },
    reducers: {
        setServiceData: (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        setServiceLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setServiceError: (state, action) => {
            state.error = action.payload;
        },
        setSelectedService: (state, action) => {
            state.selectedService = action.payload;
        },
    },
})

export const { setServiceData, setServiceLoading, setServiceError, setSelectedService } = serviceSlice.actions;

export const fetchServiceData = () => async (dispatch) => {
    dispatch(setServiceLoading(true));
    try {
        const response = await axios.get(import.meta.env.VITE_BASE_URL + "/services/getAllServices");
        dispatch(setServiceData(response.data.data));
    } catch (error) {
        dispatch(setServiceError(error.message));
    }
}

export const fetchServiceById = (id) => async (dispatch) => {
    dispatch(setServiceLoading(true));
    try {
        const response = await axios.get(import.meta.env.VITE_BASE_URL + "/services/getServiceById/" + id);
        dispatch(setSelectedService(response.data.data));
    } catch (error) {
        dispatch(setServiceError(error.message));
    }
}

export const fetchServiceByName = (name) => async (dispatch) => {
    dispatch(setServiceLoading(true));
    try {
        const response = await axios.get(import.meta.env.VITE_BASE_URL + "/services/getServiceByName/" + name);
        dispatch(setSelectedService(response.data.data));
    } catch (error) {
        dispatch(setServiceError(error.message));
    }
}       

export const addService = (formData) => async (dispatch) => {
    dispatch(setServiceLoading(true));
    try {
        const response = await axios.post(import.meta.env.VITE_BASE_URL + "/services/newService", 
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        dispatch(fetchServiceData());
    } catch (error) {
        dispatch(setServiceError(error.message));
    }
}       

export const updateService = (id, formData) => async (dispatch) => {
    try {
        const response = await axios.put(import.meta.env.VITE_BASE_URL + "/services/updateService/" + id, 
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        dispatch(fetchServiceData());
    } catch (error) {
        dispatch(setServiceError(error.message));
    }
}   

export const deleteService = (id) => async (dispatch) => {
    dispatch(setServiceLoading(true));
    try {
        const response = await axios.delete(import.meta.env.VITE_BASE_URL + "/services/deleteService/" + id);
        dispatch(fetchServiceData());
    } catch (error) {
        dispatch(setServiceError(error.message));
    }
}

export const selectServiceData = (state) => state.service.data;
export const selectServiceLoading = (state) => state.service.isLoading;
export const selectServiceError = (state) => state.service.error;
export const selectSelectedService = (state) => state.service.selectedService;

export default serviceSlice.reducer;