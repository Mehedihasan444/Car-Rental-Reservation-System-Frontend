import { createContext, useEffect, useCallback, ReactNode, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout, signIn } from '@/redux/features/auth/authSlice';
import tokenManager from '@/utils/tokenManager';
import { RootState } from '@/redux/store';

interface AuthContextType {
  refreshToken: () => Promise<void>;
  checkTokenExpired: () => boolean;
  handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state: RootState) => state?.auth?.token);
  const currentUser = useAppSelector((state: RootState) => state?.auth?.user);
  const hasInitialized = useRef(false);

  /**
   * Logout user and clear tokens
   */
  const handleLogout = useCallback(() => {
    tokenManager.clearTokens();
    dispatch(logout());
  }, [dispatch]);

  /**
   * Check if token is expired
   */
  const checkTokenExpired = useCallback(() => {
    // First check if we have a token in Redux
    if (token) {
      // If Redux has a token, check tokenManager
      const hasStoredToken = tokenManager.hasToken();
      
      // If tokenManager doesn't have the token yet, it's not expired (just not synced)
      if (!hasStoredToken) {
        console.log('⚠️ Token in Redux but not in tokenManager yet - treating as valid');
        return false;
      }
      
      return tokenManager.isTokenExpired();
    }
    
    // No token in Redux = expired
    return true;
  }, [token]);

  /**
   * Refresh the access token
   */
  const refreshToken = useCallback(async () => {
    try {
      console.log('🔄 Attempting token refresh...');
      
      // Backend uses httpOnly cookie for refresh token, so we don't need to send it in body
      // Just send credentials: 'include' to send the cookie
      const response = await fetch(`${import.meta.env.VITE_BASEURL || 'http://localhost:5000/api'}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // This sends the httpOnly cookie
      });

      if (!response.ok) throw new Error('Refresh failed');

      const result = await response.json();
      console.log('🔄 Refresh token response:', result);
      
      // Accept both { token } and { token, data } formats
      const accessToken = result.token || result.data?.token;
      if (!accessToken) throw new Error('No access token in response');
      
      console.log('🔑 New access token received');
      console.log('👤 Current user from Redux:', currentUser);
      
      // Update token manager first
      tokenManager.updateAccessToken(accessToken, 3600);
      let userToSet = currentUser;
      
      // If user info is missing, fetch from backend
      if (!userToSet || !userToSet.role) {
        console.log('⚠️ User info missing, fetching from backend...');
        try {
          const userRes = await fetch(`${import.meta.env.VITE_BASEURL || 'http://localhost:5000/api'}/users/me`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${accessToken}` },
            credentials: 'include',
          });
          if (userRes.ok) {
            const userJson = await userRes.json();
            userToSet = userJson.data || null;
            console.log('✅ User info fetched:', userToSet);
          }
        } catch {
          console.log('❌ Failed to fetch user info');
        }
      }
      
      console.log('🔄 Updating Redux with user:', userToSet);
      
      // Always use signIn to ensure both user and token are set properly
      if (userToSet) {
        dispatch(signIn({ user: userToSet, token: accessToken }));
      } else {
        // If we can't get user info, logout
        console.log('❌ No user info available after token refresh, logging out');
        handleLogout();
      }
    } catch (error) {
      console.error('Failed to refresh token:', error);
      handleLogout();
    }
  }, [handleLogout, dispatch, currentUser]);

  /**
   * Initialize auth state by checking existing tokens - only run once on mount
   */
  const initializeAuth = useCallback(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;
    
    console.log('🔍 Initializing auth state...');
    
    // Simply ensure tokenManager is synced with Redux state if Redux has valid auth
    if (token && currentUser) {
      console.log('✅ Redux has valid auth state, ensuring tokenManager sync');
      const storedToken = tokenManager.getAccessToken();
      if (!storedToken) {
        console.log('📥 Syncing tokenManager with Redux token');
        tokenManager.updateAccessToken(token, 3600);
      }
    }
    
    console.log('✅ Auth initialization complete');
  }, [token, currentUser]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  /**
   * Setup token refresh scheduler - only when token exists and user is logged in
   */
  useEffect(() => {
    if (!token || !currentUser) {
      console.log('⚠️ No token or user found, skipping refresh setup');
      return;
    }

    console.log('🔍 Checking token expiration for refresh setup...');
    
    // Give tokenManager time to sync with Redux (prevent race condition after login)
    const checkTimeout = setTimeout(() => {
      if (checkTokenExpired()) {
        console.log('⏰ Token expired, refreshing...');
        refreshToken();
      } else {
        console.log('✅ Token is still valid, scheduling refresh');
      }
    }, 100); // Reduced from 200ms to 100ms

    const refreshTimeout = tokenManager.scheduleTokenRefresh(refreshToken);

    return () => {
      clearTimeout(checkTimeout);
      if (refreshTimeout) {
        clearTimeout(refreshTimeout);
      }
    };
  }, [token, currentUser, refreshToken, checkTokenExpired]);

  /**
   * Check token on visibility change
   */
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && token && checkTokenExpired()) {
        refreshToken();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [token, refreshToken, checkTokenExpired]);

  const value: AuthContextType = {
    refreshToken,
    checkTokenExpired,
    handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
