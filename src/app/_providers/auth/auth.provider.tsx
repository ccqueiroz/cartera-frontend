"use client";

import { createContext } from "react";
import { useAuth } from "./hook/useAuth.hook";

const AuthContext = createContext(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  useAuth();

  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
