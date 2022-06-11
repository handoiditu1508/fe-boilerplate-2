import { Navigate, useLocation } from "react-router-dom";

import React from "react";
import { selectCurrentUser } from "../../redux/features/authentication/authenticationSlice";
import useAppSelector from "../../hooks/useAppSelector";

interface RequireAuthProps {
  children: React.ReactNode[] | React.ReactNode
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace={true} state={{ redirect: location.pathname + location.search }} />
  }

  return (<>{children}</>);
}