import React from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import Logo from './Logo';

class LoginNavBar extends React.Component {

  render() {
    return (
      <Navbar style={styles.navbar} expand="lg" className="shadow">
        <Navbar.Brand href="#">
          <Logo/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" activeKey={this.props.activeKey}>
            <Nav.Link eventKey={0} style={styles.navlink} href="/">Login</Nav.Link>
            <Nav.Link eventKey={1} style={styles.navlink} href="/home">Quiz</Nav.Link>
            <Nav.Link eventKey={2} style={styles.navlink} href="/hallOfFame">Hall of Fame</Nav.Link>
            <Nav.Link eventKey={3} style={styles.navlink} href="/music">Music</Nav.Link>
            <Nav.Link eventKey={4} style={styles.navlink} href="/community">Community</Nav.Link>
            <Nav.Link eventKey={5} style={styles.navlink} href="/schedules">Schedule</Nav.Link>
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
