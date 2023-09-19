import React from "react";
import {Navigate, Outlet} from 'react-router-dom';
import {useAppSelector} from "../store/hooks";
import {selectIsAuth} from "../store/auth/auth-select";

interface ProtectedRouteProps {
  redirectPath: string
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({redirectPath}) => {
  const isAuth = useAppSelector(selectIsAuth);

  if (!isAuth) {
    return <Navigate to={redirectPath} replace/>;
  }

  return <Outlet/>;
}
