import React from 'react';
import { Container, Navbar, Nav, Form, Button, Image, NavDropdown } from 'react-bootstrap';
import auth from '../services/auth';
import { connect } from 'react-redux';
import { deleteProfile } from '../redux/actions';

class NavBar extends React.Component {

  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(){
    auth.logout();
    this.props.deleteProfile();
    this.props.history.push("/");
  }

  render() {
    return (
      <Navbar bg="light" expand="lg" className="shadow">
        <Navbar.Brand href="#">
          <Image style={styles.logo} fluid src={require("../img/bts-army-logo.png")}/>
          BTS-ARMY Verifier
        </Navbar.Brand>
        <Navbar.Toggle style={styles.navlink} aria-controls="basic-navbar-nav" />
        <Navbar.Collapse style={styles.navlink} id="basic-navbar-nav">
          <Nav style={styles.navlink} className="ml-auto">
            <Nav.Link style={styles.navlink} href="/home">Quiz</Nav.Link>
            <Nav.Link style={styles.navlink} href="/hallOfFame">Hall of Fame</Nav.Link>
            <NavDropdown className="nav-dropdown"
              id="nav-dropdown" style={styles.dropdown}
              title={
                      <div style={styles.dropdownContainer}>
                        {this.props.profile[0].name}
                          <img className="thumbnail-image"
                              src={this.props.profile[0].imageUrl}
                              alt="User Icon"
                              style={styles.thumbnail}
                          />
                      </div>
                  }>
              <NavDropdown.Item href="/account">Account</NavDropdown.Item>
              <NavDropdown.Item>Submit Question</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={this.handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

/*<Form inline>
  <Button onClick={this.handleLogout} variant="outline-success">Logout</Button>
</Form>*/

const styles = {
  logo: {
    width: 30,
    marginRight: 15,
    marginLeft: 30,
  },
  thumbnail: {
    width:30,
    marginLeft: 10
  },
  dropdown: {
    marginRight: 30,
    width: 100,
    marginLeft:30,

  },
  dropdownContainer: {
    marginLeft: 20,
    marginBottom: -28,
  },
  navlink: {
    marginLeft: 40,
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps, {deleteProfile:deleteProfile}) (NavBar);
