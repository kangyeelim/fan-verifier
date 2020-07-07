import React from 'react';
import { Navbar, Nav, Form, Button, Image } from 'react-bootstrap';
import auth from '../services/auth';

class NavBar extends React.Component {

  constructor() {
    super();
    this.toHome = this.toHome.bind(this);
    this.toHallOfFame = this.toHallOfFame.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  toHome() {
    this.props.history.push("/home")
  }

  toHallOfFame() {
    this.props.history.push("/hallOfFame")
  }

  handleLogout(){
    auth.logout();
    this.props.history.push("/");
  }

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
            <Nav.Link onClick={this.toHome}>Quiz</Nav.Link>
            <Nav.Link onClick={this.toHallOfFame}>Hall of Fame</Nav.Link>
            <Form inline>
              <Button onClick={this.handleLogout} variant="outline-success">Logout</Button>
            </Form>
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

export default NavBar;