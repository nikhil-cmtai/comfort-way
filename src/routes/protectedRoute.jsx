import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = token || localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const roleId = 'NpkR5K3M242WKHPdVTTw';

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export default ProtectedRoute;