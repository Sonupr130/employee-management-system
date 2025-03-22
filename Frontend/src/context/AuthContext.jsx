

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
    role: null,
  });

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth)); // ✅ Load from localStorage
    }
  }, []);

  const login = (data) => {
    const { token, user } = data;
    const newAuth = {
      user,
      token,
      role: user.role, // ✅ Extract role from user object
    };

    setAuth(newAuth);
    localStorage.setItem("auth", JSON.stringify(newAuth)); // ✅ Store in localStorage
  };

  const logout = () => {
    setAuth({ user: null, token: null, role: null });
    localStorage.removeItem("auth"); // ✅ Clear storage
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return { ...context, user: context.auth.user }; // ✅ Directly return user
};
