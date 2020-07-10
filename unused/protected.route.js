import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../services/auth';

export const ProtectedRoute = async ({component:Component, ...rest}) => {
  const isAuthenticated = await auth.isAuthenticated();
  return (
    <Route
    {...rest}
    render={props => {
      if (isAuthenticated) {
        return <Component{...props} {...rest}/>
      } else {
        return <Redirect to="/"/>;
      }
    }}
    />
  );
}

/*if (auth.isAuthenticated()) {
  console.log("is authenticated");
  return <Component{...props} {...rest}/>
} else {
  console.log("is not authenticated");
  return <Redirect to="/"/>
}*/
