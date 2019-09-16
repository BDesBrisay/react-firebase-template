import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { isSignedIn } from '../../utils/userState';

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    (isSignedIn()) ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
);

export default AuthRoute;