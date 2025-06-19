import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser]   = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------- Recuperar sesión guardada ---------- */
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
    setLoading(false);
  }, []);

  /* ---------- Login ---------- */
  const login = ({ username, password }) => {
    /* normalizamos a minúsculas por si el usuario escribe “Steve” */
    const u = username?.trim().toLowerCase();
    const p = password;

    if (u === "steve" && p === "craftear") {
      const userData = { username: "steve", name: "Steve" };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    }
    return false;          // credenciales incorrectas
  };

  /* ---------- Logout ---------- */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = { user, login, logout, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth debe ser usado dentro de AuthProvider");
  return context;
};
