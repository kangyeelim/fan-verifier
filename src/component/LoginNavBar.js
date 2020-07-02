import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

class LoginNavBar extends React.Component {
  render() {
    return (
      <Navbar bg="light" expand="lg" className="shadow">
        <Navbar.Brand href="#">BTS-ARMY Verifier</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Login</Nav.Link>
            <Nav.Link href="/publicHallOfFame">Hall of Fame</Nav.Link>
         </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default LoginNavBar;
