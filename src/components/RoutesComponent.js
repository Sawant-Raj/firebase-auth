import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import UserProfile from "./Profile/UserProfile";
import AuthContext from "../store/auth-context";

const RoutesComponent = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      {authCtx.isLoggedIn && (
        <Route path="/profile" element={<UserProfile />} />
      )}
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};

export default RoutesComponent;
