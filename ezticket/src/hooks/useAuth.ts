import { useState, useEffect } from 'react';
import { apiService } from '@/services/api';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored authentication on mount
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getCurrentUser();
      
      if (response.success && response.data) {
        setUser(response.data);
      } else {
        setUser(null);
      }
    } catch {
      setError('Failed to check authentication status');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await apiService.login(credentials);
      
      if (response.success && response.data) {
        setUser(response.data.user);
        return { success: true, data: response.data };
      } else {
        setError(response.error || 'Login failed');
        return { success: false, error: response.error || 'Login failed' };
      }
    } catch (err) {
      const errorMessage = 'Login failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterCredentials) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await apiService.register(userData);
      
      if (response.success) {
        return { success: true, message: response.data?.message || 'Registration successful' };
      } else {
        setError(response.error || 'Registration failed');
        return { success: false, error: response.error || 'Registration failed' };
      }
    } catch (err) {
      const errorMessage = 'Registration failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await apiService.logout();
      setUser(null);
      setError(null);
    } catch (err) {
      setError('Logout failed');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (email: string, otpCode: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await apiService.verifyEmail({ email, otpCode });
      
      if (response.success) {
        // Refresh user data to get updated verification status
        await checkAuthStatus();
        return { success: true, message: response.data?.message || 'Email verified successfully' };
      } else {
        setError(response.error || 'Email verification failed');
        return { success: false, error: response.error || 'Email verification failed' };
      }
    } catch (err) {
      const errorMessage = 'Email verification failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async (email: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await apiService.resendOtp({ email });
      
      if (response.success) {
        return { success: true, message: response.data?.message || 'Verification code sent' };
      } else {
        setError(response.error || 'Failed to resend code');
        return { success: false, error: response.error || 'Failed to resend code' };
      }
    } catch (err) {
      const errorMessage = 'Failed to resend verification code. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    verifyEmail,
    resendOtp,
    isAuthenticated: !!user,
  };
} 