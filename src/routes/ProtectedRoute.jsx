import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const { user, token } = useAuth();
  const location = useLocation();

  if (!user || !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const userRoleID = user.roleID;
  const allowedRoleIDs = {
    admin: 1,
    student: 2,
    teacher: 3,
  };

  const allowed = allowedRoles.map((role) => allowedRoleIDs[role]);

  if (!allowed.includes(userRoleID)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
