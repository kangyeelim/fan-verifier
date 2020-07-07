import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from './auth';

export const ProtectedRoute = ({component:Component, ...rest}) => {
  return (
    <Route
    {...rest}
    render={props => {
      if (auth.isAuthenticated()) {
        console.log("is authenticated");
        return <Component{...props} {...rest}/>
      } else {
        console.log("is not authenticated");
        return <Redirect to="/"/>
      }
    }}
    />
  );
}
