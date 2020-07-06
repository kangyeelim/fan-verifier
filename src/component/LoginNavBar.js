import React from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';

class LoginNavBar extends React.Component {
  render() {
    return (
      <Navbar bg="light" expand="lg" className="shadow">
        <Navbar.Brand href="#">
          <Image style={styles.logo} fluid src={require("../img/bts-army-logo.png")}/>
          BTS-ARMY Verifier
        </Navbar.Brand>
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

const styles = {
  logo: {
    width: 30,
    marginRight: 15
  }
}

export default LoginNavBar;
