import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
    selectedTask: null,
  },
  reducers: {
    setTaskData: (state, action) => {
      state.data = action.payload.data;
      state.isLoading = false;
      state.error = null; 
    },
    setTaskLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setTaskError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setTaskData,
  setTaskLoading,
  setTaskError,
  setSelectedTask,
} = taskSlice.actions;


// Fetch all customers
export const fetchTaskData = () => async (dispatch) => {
  dispatch(setTaskLoading());
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + "/tasks/getAllTasks",
    );
    dispatch(setTaskData(response.data.data));
  } catch (error) {
    dispatch(setTaskError(error.message));
  }
};

// Fetch customer by ID
export const fetchTaskById = (taskId) => async (dispatch) => {
  dispatch(setTaskLoading());
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + `/tasks/getTaskById/${taskId}`,
    );
    dispatch(setSelectedTask(response.data.data));
  } catch (error) {
    dispatch(setTaskError(error.message));
  }
};

// Add a new customer
export const addTask = (newTask) => async (dispatch) => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_BASE_URL + "/tasks/newTask",
      newTask,
    );
    dispatch(fetchTaskData());
    return response.data;
  } catch (error) {
    dispatch(setTaskError(error.message));
    return false;
  }
};

// Edit a customer
export const editTask = (taskId, updatedData) => async (dispatch) => {
  try {
    await axios.put(
      import.meta.env.VITE_BASE_URL + `/tasks/updateTask/${taskId}`,
      updatedData,
    );
    dispatch(fetchTaskData());
    return true;
  } catch (error) {
    dispatch(setTaskError(error.message));
    return false;
  }
};

export const assignTask  = (taskId, status) => async (dispatch) => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_BASE_URL + `/tasks/assignTask/${taskId}`,
      status,
    );
    dispatch(fetchTaskData());
    return response.data;
  } catch (error) {
    dispatch(setTaskError(error.message));
    return false;
  }
};

export const bulkAssignTask = (taskIds = [], status = []) => async (dispatch) => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_BASE_URL + `/tasks/bulkAssignTask`,
      { taskIds, status },
    );
    dispatch(fetchTaskData());
    return response.data;
  } catch (error) {
    dispatch(setTaskError(error.message));
    return false;
  }
};

// Delete a customer
export const deleteTask = (taskId) => async (dispatch) => {
  try {
    await axios.delete(
        import.meta.env.VITE_BASE_URL + `/tasks/deleteTask/${taskId}`,
    );
    dispatch(fetchTaskData());
    return true;
  } catch (error) {
    dispatch(setTaskError(error.message));
    return false;
  }
};

// Selectors
export const selectTaskData = (state) => state.task.data;
export const selectTaskLoading = (state) => state.task.isLoading;
export const selectTaskError = (state) => state.task.error;
export const selectSelectedTask = (state) => state.task.selectedTask;

export default taskSlice.reducer;
