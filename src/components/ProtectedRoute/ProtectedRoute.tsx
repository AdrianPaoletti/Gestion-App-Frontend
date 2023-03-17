import jwtDecode from "jwt-decode";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { User } from "../../models/user";

const ProtectedRoute = () => {
  try {
    if (
      (
        jwtDecode(
          localStorage.getItem(process.env.REACT_APP_TOKEN as string) as string
        ) as User
      ).username === process.env.REACT_APP_TOKEN_USERNAME
    ) {
      return <Outlet />;
    }
    return <Navigate to={"/login"} replace />;
  } catch (error) {
    console.error(error);
    return <Navigate to={"/login"} replace />;
  }
};

export default ProtectedRoute;
