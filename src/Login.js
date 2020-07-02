import React from 'react';
import { Container, Button } from 'react-bootstrap';
import LoginNavBar from './component/LoginNavBar';
import auth from './auth';

class Login extends React.Component {
  render() {
    return (
      <div>
      <LoginNavBar/>
      <Container>
        <h1 className="my-4">Login</h1>
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
