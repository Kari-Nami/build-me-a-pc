import { createContext, useContext, useState, useCallback } from 'react';
import { getCollection, setCollection, getCurrentUser, setCurrentUser } from '../utils/storage.js';
import { generateId } from '../utils/helpers.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getCurrentUser());

  const login = useCallback((email, password) => {
    const users = getCollection('users');
    const found = users.find(u => u.email === email && u.password_hash === password);
    if (!found) return { success: false, error: 'Invalid email or password' };
    if (found.is_banned) return { success: false, error: 'This account has been banned' };
    setCurrentUser(found);
    setUser(found);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setUser(null);
  }, []);

  const register = useCallback((email, password, displayName) => {
    const users = getCollection('users');
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Email already registered' };
    }
    const now = new Date().toISOString();
    const newUser = {
      id: generateId(),
      email,
      password_hash: password,
      display_name: displayName,
      avatar_url: null,
      bio: null,
      role: 'user',
      is_banned: false,
      created_at: now,
      updated_at: now,
    };
    users.push(newUser);
    setCollection('users', users);
    setCurrentUser(newUser);
    setUser(newUser);
    return { success: true };
  }, []);

  const refreshUser = useCallback(() => {
    const current = getCurrentUser();
    if (!current) return;
    const users = getCollection('users');
    const fresh = users.find(u => u.id === current.id);
    if (fresh) {
      setCurrentUser(fresh);
      setUser(fresh);
    }
  }, []);

  const value = {
    user,
    currentUser: user,
    isAuthenticated: !!user,
    isBuilder: user?.role === 'builder' || user?.role === 'admin',
    isAdmin: user?.role === 'admin',
    login,
    logout,
    register,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
