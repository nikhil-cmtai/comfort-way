import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import maintenanceRequestReducer from './slices/maintenanceSlice';
import categoryReducer from './slices/categorySlice';
import productReducer from './slices/productSlice';
import leadReducer from './slices/leadSlice';
import taskReducer from './slices/taskSlice';
import protectionReducer from './slices/protectionSlice';
import roleReducer from './slices/roleSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    maintenanceRequest: maintenanceRequestReducer,
    category: categoryReducer,
    product: productReducer,
    lead: leadReducer,
    task: taskReducer,
    protectionPlan: protectionReducer,
    role: roleReducer,
  },
});

