import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(() =>
    JSON.parse(localStorage.getItem("isSignedIn") || false)
  );

  const [userType, setUserType] = useState(
    () => localStorage.getItem("userType") || ""
  );

  useEffect(() => {
    localStorage.setItem("isSignedIn", JSON.stringify(isSignedIn));
    localStorage.setItem("userType", userType);
  }, [isSignedIn, userType]);

  const value = {
    isSignedIn,
    setIsSignedIn,
    userType,
    setUserType,
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
