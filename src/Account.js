import React from 'react';
import { Container, Image, ListGroup, Row, Col } from 'react-bootstrap';
import NavBar from './component/NavBar';
import auth from './services/auth';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { Twitter, Facebook, Instagram } from './HallOfFame';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

class Entry extends React.Component {
  async deleteEntry(entry) {
    try {
      var response = axios.delete(`http://localhost:5000/hallOfFameEntries/${entry.id}`);
      console.log(response.data);
      this.props.refreshPage();
    } catch (error) {
      console.error(error);
    }

  }

  render() {
    if (this.props.entry.social == "twitter") {
      return (
        <ListGroup.Item>
          <Row>
            <Col xs>
              <Twitter entry={this.props.entry}/>
            </Col>
            <Col md="auto">
              <a href="" style={{alignSelf:'right'}}>
                <FontAwesomeIcon icon={faEdit} style={{alignSelf:'right'}}/>
              </a>
            </Col>
            <Col md="auto">
              <a onClick={this.deleteEntry} style={{alignSelf:'right'}}>
                <FontAwesomeIcon icon={faTrashAlt} style={{alignSelf:'right'}}/>
              </a>
            </Col>
          </Row>
        </ListGroup.Item>
      );
    } else if (this.props.entry.social == "instagram") {
      return (
        <ListGroup.Item>
        <Row>
          <Col xs>
            <Instagram entry={this.props.entry}/>
          </Col>
          <Col md="auto">
            <a href="" style={{alignSelf:'right'}}>
              <FontAwesomeIcon icon={faEdit} style={{alignSelf:'right'}}/>
            </a>
          </Col>
          <Col md="auto">
            <a onClick={this.deleteEntry} style={{alignSelf:'right'}}>
              <FontAwesomeIcon icon={faTrashAlt} style={{alignSelf:'right'}}/>
            </a>
          </Col>
        </Row>
        </ListGroup.Item>
      );
    } else {
      return (
        <Row>
          <Col xs>
            <Facebook entry={this.props.entry}/>
          </Col>
          <Col md="auto">
            <a href="" style={{alignSelf:'right'}}>
              <FontAwesomeIcon icon={faEdit} style={{alignSelf:'right'}}/>
            </a>
          </Col>
          <Col md="auto">
            <a onClick={this.deleteEntry} style={{alignSelf:'right'}}>
              <FontAwesomeIcon icon={faTrashAlt} style={{alignSelf:'right'}}/>
            </a>
          </Col>
        </Row>
      );
    }
  }
}

class Account extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      entries: null
    }
  }

  async componentDidMount() {
    if (await auth.isAuthenticated()) {
      this.setState({isLoggedIn: true});
    }
    try {
      var response = await axios.get(`http://localhost:5000/hallOfFameEntries/googleId/${this.props.profile[0].googleId}`);
      this.setState({entries: response.data })
    } catch (error) {
      console.error(error);
    }
  }

  async refreshPage() {
    try {
      var response = await axios.get(`http://localhost:5000/hallOfFameEntries/googleId/${this.props.profile[0].googleId}`);
      this.setState({entries: response.data })
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    if (!this.state.isLoggedIn && this.props.profile.length !== 1) {
      return <Redirect to="/"/>
    }
    return (
      <div>
      <NavBar/>
      <Container>
        <h3 className="my-4">Account Information</h3>
        <Image style={styles.image} src={this.props.profile[0].imageUrl}/>
        <h6 style={styles.text}>Name: {this.props.profile[0].name}</h6>
        <h6 style={styles.text}>Email: {this.props.profile[0].email}</h6>
        <h6 style={styles.text}>Hall of Fame entries:</h6>
        <ListGroup>
          { this.state.entries && (
            this.state.entries.map(entry => {
               return <Entry key={entry.social + entry.name} entry={entry} refreshPage={this.refreshPage}/>;
            })
          )}
        </ListGroup>
      </Container>
      </div>
  );
  }
}

const styles = {
  image: {
    marginBottom: 20
  },
  text: {
    marginBottom: 20
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}


export default connect(mapStateToProps, {}) (Account);
