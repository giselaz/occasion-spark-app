import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as loginApi } from '@/api/userService';
// import { getAccessToken, setAccessToken, removeAccessToken } from '@/utils/tokenStorage';
import { LoginRequest,UserRegistration,User,AuthResponse } from '@/types/event';
interface AuthContextType {
  // user: Partial<User> | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<{ success: boolean; error?: string }>;
  token:string;
//   signup: (data: UserRegistration) => Promise<{ success: boolean; error?: string }>;
//   logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [token,setToken] = useState<string>('');

  const isAuthenticated = !!token;

  // Check for existing token on app load
//   useEffect(() => {
//     const checkAuthStatus = async () => {
//       const token = getAccessToken();
//       if (token) {
//         try {
//           const userData = await authService.getCurrentUser();
//           setUser(userData);
//         } catch (error) {
//           // Token might be expired or invalid
//           removeAccessToken();
//         }
//       }
//       setIsLoading(false);
//     };

//     checkAuthStatus();
//   }, []);

  const login = async (credentials: LoginRequest): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await loginApi(credentials);
      setToken(response.data.access_token);
      // setUser(response.data.user);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
      };
    }
  };

//   const signup = async (data: SignupRequest): Promise<{ success: boolean; error?: string }> => {
//     try {
//       const response = await authService.signup(data);
//       setAccessToken(response.access_token);
//       setUser(response.user);
//       return { success: true };
//     } catch (error) {
//       return { 
//         success: false, 
//         error: error instanceof Error ? error.message : 'Signup failed' 
//       };
//     }
//   };

//   const logout = () => {
//     removeAccessToken();
//     setUser(null);
//     // Optional: Call API to invalidate refresh token
//     authService.logout();
//   };

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    login,
    token
   
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};