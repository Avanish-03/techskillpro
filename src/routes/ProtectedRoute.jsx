import React from 'react';
import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ role, children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.roleId !== role) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
