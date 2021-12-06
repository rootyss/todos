import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.jsx';

const Login = () => {
  const { user } = useAuth();

  return (
    user ? <Navigate to="/todo" /> : <div>Login Page</div>
  );
};

export default Login;
