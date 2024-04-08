import React, { useState } from "react";

const AuthContext = React.createContext({
  // it creates a context object
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

// exporting AuthContextProvider as a named export
export const AuthContextProvider = (props) => {
  const initalToken=localStorage.getItem("token");
  const [token, setToken] = useState(initalToken); // empty string bhi use kr skte hain in place of null. If you use null, it typically means that the state hasn't been initialized with any meaningful value yet. It's often used to represent the absence of a value or an uninitialized state. If you use an empty string, it means that the state has been initialized with an empty value.

  const userIsLoggedIn = !!token; // if token is a non-empty string, it will return true otherwise false

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  ); // ye isliye likhte hain taaki AuthContextProvider se jin components to wrap karaunga wo AuthContext use kar saken
};

export default AuthContext;
