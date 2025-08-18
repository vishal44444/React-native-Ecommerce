import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import{ auth } from "./firebase/firebaseConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); 

      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = () => setIsLoggedIn(true);

  const logout = async () => {
    await signOut(auth);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ IsLoggedIn, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
