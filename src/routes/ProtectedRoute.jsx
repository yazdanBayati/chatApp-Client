import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = (props) => {
  let isLogin = false;
  const json = localStorage.getItem('login');
  if (json) {
    var login = JSON.parse(json);
    isLogin = login.isLogin;
  }

  return isLogin ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/login" />
  );
};

export default ProtectedRoute;
