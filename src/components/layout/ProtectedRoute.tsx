// import { ReactNode } from 'react';
// import { useAppSelector } from '../../redux/hooks';
// import { Navigate } from 'react-router-dom';
// import { RootState } from '@/redux/store';

// const ProtectedRoute = ({ children }: { children: ReactNode }) => {
//   const token = useAppSelector((state: RootState) => state?.auth?.token);

//   if (!token) {
//     return <Navigate to="/login" replace={true} />;
//   }

//   return children;
// };

// export default ProtectedRoute;
import { ReactNode } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { Navigate } from 'react-router-dom';
import { RootState } from '@/redux/store';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const token = useAppSelector((state: RootState) => state?.auth?.token);
  const role = useAppSelector((state: RootState) => state?.auth?.user?.role);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  if (!role || !allowedRoles.includes(role)) {
    // Redirect to home or an unauthorized page if the role is not allowed
    return <Navigate to="/" replace={true} />;
  }

  return <>{children}</>; // Ensure children is rendered inside a fragment
};

export default ProtectedRoute;
