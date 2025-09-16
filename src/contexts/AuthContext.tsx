'use client';

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import { signIn as apiSignIn, SignInCredentials } from '@/services/authService';

interface User {
  id: string;
  name: string | null;
  email: string;
  role: 'ADMIN' | 'USER';
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('@suporteApp:token');
    const storedUser = localStorage.getItem('@suporteApp:user');

    if (storedToken && storedUser) {
      setUser(JSON.parse(storedUser));
      api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    setLoading(false);
  }, []);

  const signIn = async ({ email, password }: SignInCredentials) => {
    try {
      const { token, user: userData } = await apiSignIn({ email, password });

      localStorage.setItem('@suporteApp:token', token);
      localStorage.setItem('@suporteApp:user', JSON.stringify(userData));

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);

      if (userData.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      throw new Error('Email ou senha inválidos.');
    }
  };

  const signOut = () => {
    localStorage.removeItem('@suporteApp:token');
    localStorage.removeItem('@suporteApp:user');

    setUser(null);
    delete api.defaults.headers.common['Authorization'];
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signIn,
        signOut,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
