import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/hooks';

/**
 * Hook to check if Redux Persist has finished rehydrating
 */
export const useIsRehydrated = () => {
  const [isRehydrated, setIsRehydrated] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const persistState = useAppSelector((state) => (state as any)._persist);

  useEffect(() => {
    // Once rehydrated, stay rehydrated (don't flip back to false)
    if (isRehydrated) return;
    
    // Check if rehydration is complete
    if (persistState?.rehydrated) {
      console.log('✅ Redux rehydration complete');
      setIsRehydrated(true);
    } else {
      // Fallback: assume rehydrated after a short delay
      const timer = setTimeout(() => {
        console.log('⏰ Redux rehydration timeout reached, assuming complete');
        setIsRehydrated(true);
      }, 300); // Reduced from 500ms to 300ms
      return () => clearTimeout(timer);
    }
  }, [persistState, isRehydrated]);

  return isRehydrated;
};
