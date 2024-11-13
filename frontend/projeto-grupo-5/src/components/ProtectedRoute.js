// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    alert("Acesso restrito!");
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
