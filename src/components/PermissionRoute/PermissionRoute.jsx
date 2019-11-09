import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Route, Redirect } from 'react-router-dom';
import { gql } from 'graphql.macro';

import { Loading } from '../Loading/';

export const ANONYMOUS_PERMISSION = 'anonymous';
export const AUTHENTICATED_PERMISSION = 'authenticated';

export const AUTHENTICATED_QUERY = gql`
  query IsAuthenticated {
    authenticated @client
  }
`;

const PermissionRoute = ({ permission, ...rest }) => {
  const {
    data: { authenticated },
    loading,
    error,
  } = useQuery(AUTHENTICATED_QUERY);

  if (loading) return <Loading />;
  if (error) return <div>error</div>;

  if (authenticated && permission === AUTHENTICATED_PERMISSION) {
    return <Route {...rest} />;
  } else if (authenticated && permission === ANONYMOUS_PERMISSION) {
    return <Redirect to="/" />;
  } else if (!authenticated && permission === ANONYMOUS_PERMISSION) {
    return <Route {...rest} />;
  } else {
    return <Redirect to="/login" />;
  }
};

export default PermissionRoute;
