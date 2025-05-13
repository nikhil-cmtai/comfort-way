import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const statSlice = createSlice({
    name: "stats",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        setStats: (state, action) => {
            state.data = action.payload.data;
            state.isLoading = false;
            state.error = null;
        },
        setStatsLoading: (state, action) => {
            state.isLoading = action.payload;
            state.error = null;
        },
        setStatsError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setStats, setStatsLoading, setStatsError } = statSlice.actions;

export const fetchStats = () => async (dispatch) => {
    dispatch(setStatsLoading(true));
    try {
        const response = await axios.get(import.meta.env.VITE_BASE_URL + "/stats");
        dispatch(setStats(response.data));
    } catch (error) {
        dispatch(setStatsError(error.message));
    }
};

export const selectStats = (state) => state.stats.data;
export const selectStatsLoading = (state) => state.stats.isLoading;
export const selectStatsError = (state) => state.stats.error;

export default statSlice.reducer;