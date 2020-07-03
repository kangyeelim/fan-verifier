import React from 'react';
import { Container, Button } from 'react-bootstrap';
import LoginNavBar from './component/LoginNavBar';
import auth from './services/auth';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {removeFromStorage} from './services/Storage';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      isFailure: false
    }
    this.responseGoogleSuccess = this.responseGoogleSuccess.bind(this);
    this.responseGoogleFailure = this.responseGoogleFailure.bind(this);
  }
  responseGoogleSuccess(response) {
    //check if googleId has corresponding token, if yes update
    //if googleId no corresponding token, then added
    //check if googleId exists in user db, if yes update
    //if googleId do not exist, then add
    auth.login(response)
    this.props.history.push("/home");
  }

  responseGoogleFailure(response) {
    console.log("failed");
    this.setState({isFailure: true});
  }

  render() {
    return (
      <div>
      <LoginNavBar/>
      { this.state.isFailure && (
        <h2>Login failed. Please try again.</h2>
      )}
      <Container>
        <h1 className="my-4">Login</h1>
        <GoogleLogin
        clientId= {GOOGLE_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={this.responseGoogleSuccess}
        onFailure={this.responseGoogleFailure}
        cookiePolicy={'single_host_origin'}
        responseType='code,token'
        />
      </Container>
      </div>
  );
  }
}

export default Login;
