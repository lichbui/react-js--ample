import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { isLogin } from '../ultils/common'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props =>
      !isLogin() ? (
        <Redirect to='/login'/>
      ) : (
        <Component {...props} />
      )
    }
    />
  );
};
export default PrivateRoute;