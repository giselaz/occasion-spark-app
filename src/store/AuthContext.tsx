import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as loginApi } from '@/api/userService';
import { LoginRequest, } from '@/types/event';
import { setupInterceptors } from '@/api/Interceptor';
import { generateAccess } from '@/api/userService';
interface AuthContextType {
  // user: Partial<User> | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<{ success: boolean; error?: string }>;
  token:string;
//   signup: (data: UserRegistration) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
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
  const [isAuthenticated,setIsAuthenticated] = useState(false);

   useEffect(() => {
    const tryRefresh = async () => {
      try {
        const response = await generateAccess();
        setToken(response.access_token);
        setIsAuthenticated(true);
      } catch (err) { 
        setToken(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    tryRefresh();
  }, []);
  // Check for existing token on app load 
  useEffect(() => {
    setupInterceptors(
      () => token,        // getter
      (t) => setToken(t), // setter
      logout              // handle refresh failure
    );
  }, [token]);


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

  const logout = () => {
    setToken("");
  }
    // Optional: Call API to invalidate refresh token  };

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    login,
    token,
    logout
   
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};