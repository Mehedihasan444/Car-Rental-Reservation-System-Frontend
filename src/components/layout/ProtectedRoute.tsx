import { ReactNode } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { Navigate } from 'react-router-dom';
import { RootState } from '@/redux/store';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector((state: RootState) => state?.auth?.token);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;