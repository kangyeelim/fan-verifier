import React from 'react';
import { Container } from 'react-bootstrap';
import LoginNavBar from './component/LoginNavBar';

class LoginHallOfFame extends React.Component {
  render() {
    return (
      <div>
      <LoginNavBar/>
      <Container>
        <h1 className="my-4">Hall of Fame</h1>
      </Container>
      </div>
  );
  }
}

export default LoginHallOfFame;
