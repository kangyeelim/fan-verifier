import React from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';

class LoginNavBar extends React.Component {
  render() {
    return (
      <Navbar style={styles.navbar} expand="lg" className="shadow">
        <Navbar.Brand href="#">
          <Image style={styles.logo} fluid src={require("../img/bts-army-logo.png")}/>
          BTS-ARMY Verifier
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link style={styles.navlink} href="/">Login</Nav.Link>
            <Nav.Link style={styles.navlink} href="/home">Quiz</Nav.Link>
            <Nav.Link style={styles.navlink} href="/hallOfFame">Hall of Fame</Nav.Link>
            <Nav.Link style={styles.navlink} href="/music">Music</Nav.Link>
            <Nav.Link style={styles.navlink} href="/community">Community</Nav.Link>
            <Nav.Link style={styles.navlink} href="/contact">Contact</Nav.Link>
         </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const styles = {
  navbar: {
    backgroundColor:'#dec3ff'
  },
  logo: {
    width: 30,
    marginRight: 15
  },
  navlink: {
    marginLeft: 20,
    fontSize: 16,
  },
}

export default LoginNavBar;
