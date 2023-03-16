import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  isValidToken: boolean;
  // setValidToken: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProtectedRoute = () => {
  const [isValidToken, setIsValidToken] = useState<boolean>(false);
  const [flag, setFlag] = useState<boolean>(false);

  useEffect(() => {
    try {
      const { token } = JSON.parse(
        localStorage.getItem(process.env.REACT_APP_TOKEN as string) || ""
      );
      const validToken: { username: string } = jwtDecode(token);
      if (validToken.username === process.env.REACT_APP_TOKEN_USERNAME) {
        setIsValidToken(true);
      }
      setFlag(true);
    } catch (error) {
      console.warn("Token error", error);
      setIsValidToken(false);
      setFlag(true);
    }
  }, []);

  console.log(isValidToken);

  return isValidToken ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default ProtectedRoute;
