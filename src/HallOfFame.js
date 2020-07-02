import React from 'react';
import { Container } from 'react-bootstrap';
import NavBar from './component/NavBar';

class HallOfFame extends React.Component {
  render() {
    return (
      <div>
      <NavBar/>
      <Container>
        <h1 className="my-4">Hall of Fame</h1>
      </Container>
      </div>
  );
  }
}

export default HallOfFame;
