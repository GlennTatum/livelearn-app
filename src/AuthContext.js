import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(() =>
    JSON.parse(localStorage.getItem("isSignedIn") || false)
  );

  useEffect(() => {
    localStorage.setItem("isSignedIn", JSON.stringify(isSignedIn));
  }, [isSignedIn]);

  const value = {
    isSignedIn,
    setIsSignedIn,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log("auth context", context);
  if (!context) {
    throw new Error("useAuth must be used in Authenticator");
  }
  return context;
};
