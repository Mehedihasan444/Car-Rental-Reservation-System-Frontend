import { ReactNode, useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { Navigate } from 'react-router-dom';
import { RootState } from '@/redux/store';
import { useIsRehydrated } from '@/hooks/useIsRehydrated';
import tokenManager from '@/utils/tokenManager';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const token = useAppSelector((state: RootState) => state?.auth?.token);
  const role = useAppSelector((state: RootState) => state?.auth?.user?.role);
  const user = useAppSelector((state: RootState) => state?.auth?.user);
  const isRehydrated = useIsRehydrated();
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  console.log('🛡️ ProtectedRoute RENDERED', { 
    allowedRoles, 
    currentPath: window.location.pathname,
    hasToken: !!token,
    hasUser: !!user,
    role,
    isRehydrated 
  });

  // Validate token with server when component mounts or token changes
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        console.log('❌ No token found');
        setIsTokenValid(false);
        setIsValidating(false);
        return;
      }

      console.log('🔍 Starting token validation...');
      setIsValidating(true);

      // Wait a bit to ensure Redux state is fully updated after navigation
      // This prevents race conditions where token exists but user/role hasn't loaded yet
      await new Promise(resolve => setTimeout(resolve, 50)); // Reduced from 100ms to 50ms

      // Check if token is expired using tokenManager first when storage is in sync
      const hasStoredToken = tokenManager.hasToken();
      
      // Only check expiration if tokenManager has the token
      // If token is in Redux but not in tokenManager, it's still syncing - treat as valid
      if (hasStoredToken && tokenManager.isTokenExpired()) {
        console.log('🔴 Token is expired');
        setIsTokenValid(false);
        setIsValidating(false);
        return;
      }
      
      // If token is in Redux but not in tokenManager yet, give it time to sync
      if (!hasStoredToken) {
        console.log('⏳ Token not in tokenManager yet, waiting for sync...');
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Check again after waiting
        if (!tokenManager.hasToken()) {
          console.log('❌ Token still not synced, validation failed');
          setIsTokenValid(false);
          setIsValidating(false);
          return;
        }
      }

      // Validate token with server using the new /users/me endpoint
      try {
        const response = await fetch(`${import.meta.env.VITE_BASEURL || 'http://localhost:5000/api'}/users/me`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
          credentials: 'include',
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            console.log('✅ Token is valid with server');
            setIsTokenValid(true);
            setIsValidating(false);
            return;
          }
        }
        
        console.log('❌ Server token validation failed');
        setIsTokenValid(false);
        setIsValidating(false);
      } catch (error) {
        console.error('❌ Token validation error:', error);
        setIsTokenValid(false);
        setIsValidating(false);
      }
    };

    if (isRehydrated && token) {
      validateToken();
    } else if (isRehydrated && !token) {
      setIsTokenValid(false);
      setIsValidating(false);
    }
  }, [token, isRehydrated]);

  // Wait for Redux persist to rehydrate
  if (!isRehydrated) {
    console.log('⏳ Waiting for Redux to rehydrate...');
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>;
  }

  // CRITICAL: Wait for validation to complete before making any access decisions
  // This prevents the "flash redirect" issue after login
  if (isValidating || (token && isTokenValid === null)) {
    console.log('⏳ Token validation in progress...', { 
      isValidating,
      isTokenValid, 
      hasUser: !!user, 
      role 
    });
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      <span className="ml-2">Validating authentication...</span>
    </div>;
  }

  // Also wait if user/role hasn't loaded yet (even if token validation is done)
  if (token && (!user || !role)) {
    console.log('⏳ Waiting for user/role to load from Redux...', { 
      hasUser: !!user, 
      role 
    });
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      <span className="ml-2">Loading user data...</span>
    </div>;
  }

  console.log('🔐 ProtectedRoute Check:', { 
    token: token ? 'Present' : 'Missing', 
    isTokenValid,
    hasStoredToken: tokenManager.hasToken(),
    tokenExpired: token ? tokenManager.isTokenExpired() : 'N/A',
    role, 
    allowedRoles,
    currentUrl: window.location.pathname
  });

  // Check if token exists and is valid
  if (!token || isTokenValid === false) {
    console.log('❌ No valid token, redirecting to login');
    return <Navigate to="/login" replace={true} />;
  }

  // Check role authorization - only after role is loaded
  if (!role || !allowedRoles.includes(role)) {
    console.log('❌ Role check failed. User role:', role, 'Allowed roles:', allowedRoles);
    return <Navigate to="/" replace={true} />;
  }

  console.log('✅ Access granted');
  return <>{children}</>;
};

export default ProtectedRoute;