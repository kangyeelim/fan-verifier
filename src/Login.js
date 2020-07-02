import React from 'react';
import { Container, Button } from 'react-bootstrap';
import LoginNavBar from './component/LoginNavBar';
import auth from './auth';
import GoogleLogin from 'react-google-login';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

class Login extends React.Component {

  constructor() {
    super();
    this.responseGoogleSuccess = this.responseGoogleSuccess.bind(this);
    this.responseGoogleFailure = this.responseGoogleFailure.bind(this);
  }
  responseGoogleSuccess(response) {
    console.log(response);
  }

  responseGoogleFailure(response) {
    console.log(response);
  }

  render() {
    return (
      <div>
      <LoginNavBar/>
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
        <Button onClick={() => {
          auth.login(() => {
            this.props.history.push("/home");
          })
        }}>Login</Button>
      </Container>
      </div>
  );
  }
}

export default Login;
