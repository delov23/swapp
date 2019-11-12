import React, { useState } from 'react';
import { gql } from 'graphql.macro';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';

import { LoginForm } from './components/LoginForm';

export const LOG_IN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
    }
  }
`;

const Login = () => {
  const client = useApolloClient();
  const [success, setSuccess] = useState(false);

  const [handleLogin, { loading, error }] = useMutation(LOG_IN, {
    onCompleted: ({ signIn: { token } }) => {
      setSuccess(true);
      localStorage.setItem('token', token);
      client.writeData({ data: { authenticated: true } });
    },
  });

  if (success) return <Redirect to="/" />;

  return (
    <LoginForm handleLogin={handleLogin} loading={loading} error={error} />
  );
};

export default Login;
