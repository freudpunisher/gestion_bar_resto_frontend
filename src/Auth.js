import React from "react";
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const AuthCheck = ({ children }) => {
  // const { setIsAuthenticated, setToken, token } = useContext(AuthContext);
  const navigate = useNavigate();
  // Récupérer le token du localStorage
  const token = sessionStorage.getItem("token");
  console.log(token, "token");
  if (token) {
    return children;
  }
  return <Navigate to="/login" />;
};

export default AuthCheck;
