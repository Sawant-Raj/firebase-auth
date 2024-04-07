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
  const [token, setToken] = useState(null); // empty string bhi use kr skte hain in place of null

  const userIsLoggedIn = !!token; // if token is a non-empty string, it will return true otherwise false

  const loginHandler = (token) => {
    setToken(token);
  };

  const logoutHandler = () => {
    setToken(null);
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
