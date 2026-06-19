import { createContext, useContext, useMemo, useState } from 'react';
import { authService } from '../services/authService.js';

const AuthContext = createContext(null);
const AUTH_KEY = 'crownridge_auth_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(AUTH_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (credentials) => {
    const nextUser = await authService.login(credentials);
    localStorage.setItem(AUTH_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
    return nextUser;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem('crownridge_token');
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }
  return context;
}
