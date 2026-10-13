import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AccessDeniedPage } from '../../pages/auth/AccessDeniedPage';

/**
 * ProtectedRoute enforces Role-Based Access Control (RBAC).
 * - Checks authentication status.
 * - Checks allowed roles.
 * - Redirects unauthorized visitors or presents 403 Access Denied.
 */
export const ProtectedRoute = ({ allowedRoles = ['customer'], loginPath = '/login', children }) => {
  const { isAuthenticated, role, currentUser } = useAuth();
  const location = useLocation();

  // 1. Not Authenticated -> Redirect to specific portal login
  if (!isAuthenticated || !currentUser) {
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  // Normalize customer alias
  const userRole = role === 'customer' || role === 'user' ? 'customer' : role;
  const isAllowed = allowedRoles.some(r => {
    if (r === 'user' || r === 'customer') return userRole === 'customer' || userRole === 'admin' || userRole === 'owner';
    if (r === 'admin') return userRole === 'admin' || userRole === 'owner';
    if (r === 'owner') return userRole === 'owner';
    return false;
  });

  // 2. Authenticated but insufficient role -> 403 Access Denied
  if (!isAllowed) {
    return <AccessDeniedPage requiredRole={allowedRoles[0]} currentRole={userRole} />;
  }

  // 3. Authorized -> Render children or Outlet
  return children ? children : <Outlet />;
};
