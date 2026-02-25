import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token") ?? "";
    const role = localStorage.getItem("role") ?? "";
    const name = localStorage.getItem("name") ?? "";
    return token ? { token, role, name } : {};
  });

  const login = ({ accessToken, user: { name, role } }) => {
    localStorage.setItem("token", accessToken);
    localStorage.setItem("role", role);
    localStorage.setItem("name", name);
    setUser({ token: accessToken, role, name });
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
