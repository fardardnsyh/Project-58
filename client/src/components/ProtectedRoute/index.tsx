import React from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_LOGGED_IN_USER } from '../../utils/queries';

type ProtectecRouteType = {
  children: JSX.Element;
};

function ProtectedRoute({ children }: ProtectecRouteType) {
  const { loading, data } = useQuery(QUERY_LOGGED_IN_USER);
  const userData = data?.me || null;
  if (!loading && !userData) {
    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectedRoute;
