import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { handleLogin, handleRegistration } from '@/hooks/api';

interface AuthContextType {
  userToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>('');

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync('userToken');
      if (token) setUserToken(token);
      setLoading(false);
    };
    loadToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await handleLogin(email, password);
      if (response?.apiToken) {
        await SecureStore.setItemAsync('userToken', response.apiToken);
        setUserToken(response.apiToken);
        setError(null);
        router.replace('/');
      } else {
        return setError(response.errors)
      }
    } catch (e) {
      console.error('Login failed:', e);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await handleRegistration(email, password);
      if (response?.apiToken) {
        await SecureStore.setItemAsync('userToken', response.apiToken);
        setUserToken(response.apiToken);
        setError(null);
        router.replace('/');
      } else {
        return setError(response.errors)
      }
    } catch (e) {
      console.error('Registration failed:', e);
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('userToken');
    setUserToken(null);
    router.replace('/auth');
  };

  return (
    <AuthContext.Provider value={{ userToken, login, logout, register, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext<any>(AuthContext);
