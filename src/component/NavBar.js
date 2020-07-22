import React from 'react';
import { Navbar, Nav, Image, NavDropdown } from 'react-bootstrap';
import auth from '../services/auth';
import { connect } from 'react-redux';
import { deleteProfile } from '../redux/actions';
import axios from 'axios';

class NavBar extends React.Component {

  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
    this.goCommunity = this.goCommunity.bind(this);
    this.goMusic = this.goMusic.bind(this);
    this.goHome = this.goHome.bind(this);
    this.goHOF = this.goHOF.bind(this);
    this.goAccount = this.goAccount.bind(this);
    this.goContact = this.goContact.bind(this);
    this.goPosts = this.goPosts.bind(this);
    this.goDrafts = this.goDrafts.bind(this);
    this.goFavourites = this.goFavourites.bind(this);
  }

  handleLogout(){
    auth.logout();
    this.props.deleteProfile();
    this.props.history.push("/");
  }

  goCommunity() {
    this.props.history.push("/community");
  }

  goHome() {
    this.props.history.push("/home");
  }

  goHOF() {
    this.props.history.push("/hallOfFame");
  }

  goMusic() {
    this.props.history.push("/music");
  }

  goAccount() {
    this.props.history.push("/account");
  }

  goPosts() {
    this.props.history.push("/myposts");
  }

  goDrafts() {
    this.props.history.push("/drafts");
  }

  goContact() {
    this.props.history.push("/contact");
  }

  goFavourites() {
    this.props.history.push("/favourites");
  }

  render() {
    return (
      <Navbar style={styles.navbar} expand="lg" className="shadow">
        <Navbar.Brand href="#">
          <Image style={styles.logo} fluid src={require("../img/bts-army-logo.png")}/>
          BTS-ARMY Verifier
        </Navbar.Brand>
        <Navbar.Toggle style={styles.navlink} aria-controls="basic-navbar-nav" />
        <Navbar.Collapse style={styles.navlink} id="basic-navbar-nav">
          <Nav style={styles.navlink} activeKey={this.props.activeKey} className="ml-auto">
            <Nav.Link eventKey={1} style={styles.navlink} onClick={this.goHome}>Quiz</Nav.Link>
            <Nav.Link eventKey={2} style={styles.navlink} onClick={this.goHOF}>Hall of Fame</Nav.Link>
            <Nav.Link eventKey={3} style={styles.navlink} onClick={this.goMusic}>Music</Nav.Link>
            <Nav.Link eventKey={4} style={styles.navlink} onClick={this.goCommunity}>Community</Nav.Link>
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
              <NavDropdown.Item onClick={this.goAccount}>Account</NavDropdown.Item>
              <NavDropdown.Item onClick={this.goPosts}>My Posts</NavDropdown.Item>
              <NavDropdown.Item onClick={this.goDrafts}>My Drafts</NavDropdown.Item>
              <NavDropdown.Item onClick={this.goFavourites}>My Favourites</NavDropdown.Item>
              <NavDropdown.Item onClick={this.goContact}>Contact</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={this.handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
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
    marginRight: 15,
    marginLeft: 30,
  },
  thumbnail: {
    width:30,
    marginLeft: 10
  },
  dropdown: {
    marginRight: 55,
    width: 100,
    marginLeft:20,

  },
  dropdownContainer: {
    marginLeft: 20,
    marginBottom: -28,
  },
  navlink: {
    marginLeft: 20,
    fontSize: 16,
  },
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps, {deleteProfile:deleteProfile}) (NavBar);
