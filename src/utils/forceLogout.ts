import { store } from '@/redux/store';
import { logout } from '@/redux/features/auth/authSlice';
import tokenManager from './tokenManager';

/**
 * Force logout - clears all authentication data
 * Use this to completely reset authentication state for testing
 */
export const forceLogout = () => {
  console.log('🔴 Force logout initiated');
  
  // Clear Redux state
  store.dispatch(logout());
  
  // Clear token manager
  tokenManager.clearTokens();
  
  // Clear all local storage auth data
  localStorage.removeItem('persist:auth');
  localStorage.removeItem('auth_token');
  
  // Clear session storage as well
  sessionStorage.clear();
  
  // Reload the page to ensure clean state
  window.location.href = '/login';
  
  console.log('🔴 Force logout completed');
};

// Make it available globally for debugging
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).forceLogout = forceLogout;