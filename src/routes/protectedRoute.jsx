import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = token || localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const roleId = 'gm7gN219iHmhKMHazgef';
  const location = useLocation();

  // Restrict dashboard access for this roleId
  if (location.pathname.startsWith('/dashboard') && role === roleId) {
    return <Navigate to="/not-found" replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export default ProtectedRoute;