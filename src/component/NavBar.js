import React from 'react';
import { Navbar, Nav, Form, Button, Image } from 'react-bootstrap';
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
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/home">Quiz</Nav.Link>
            <Nav.Link href="/hallOfFame">Hall of Fame</Nav.Link>
            <Form inline>
              <Button onClick={this.handleLogout} variant="outline-success">Logout</Button>
            </Form>
            <Navbar.Text>
              Signed in as: {this.props.profile[0].name}
            </Navbar.Text>
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

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps, {deleteProfile:deleteProfile}) (NavBar);
