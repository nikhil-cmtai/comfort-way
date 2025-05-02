import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import maintenanceRequestReducer from './slices/maintenanceSlice';
import categoryReducer from './slices/categorySlice';
import productReducer from './slices/productSlice';
import leadReducer from './slices/leadSlice';
import protectionReducer from './slices/protectionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    maintenanceRequest: maintenanceRequestReducer,
    category: categoryReducer,
    product: productReducer,
    lead: leadReducer,
    protectionPlan: protectionReducer,
  },
});

