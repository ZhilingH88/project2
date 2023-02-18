import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import {
  selectCurrentUserIsAdmin,
} from "../features/auth/authSlice";

const RequireAdmin = () => {
  const isAdmin = useSelector(selectCurrentUserIsAdmin);
  const location = useLocation();
  return isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/403" state={{ from: location }} replace />
  );
};

export default RequireAdmin;
