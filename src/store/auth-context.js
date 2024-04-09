import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext({
  // it creates a context object
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

// exporting AuthContextProvider as a named export
export const AuthContextProvider = (props) => {
  const initalToken = localStorage.getItem("token");
  const [token, setToken] = useState(initalToken); // empty string bhi use kr skte hain in place of null. If you use null, it typically means that the state hasn't been initialized with any meaningful value yet. It's often used to represent the absence of a value or an uninitialized state. If you use an empty string, it means that the state has been initialized with an empty value.

  const userIsLoggedIn = !!token; // if token is a non-empty string, it will return true otherwise false

  const navigate = useNavigate();

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/auth");
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        logoutHandler();
      }, 5000);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  ); // ye isliye likhte hain taaki AuthContextProvider se jin components to wrap karaunga wo AuthContext use kar saken
};

export default AuthContext;
