import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthProvider';

/**
 * Custom hook to use auth context
 * Must be used within an AuthProvider
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
