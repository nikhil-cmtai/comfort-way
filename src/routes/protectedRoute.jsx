import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // const token = localStorage.getItem('token')
  const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (!isAuthenticated) {
        return <Navigate to="/sign-in" replace />;
    }

    return children;
};

export default ProtectedRoute;