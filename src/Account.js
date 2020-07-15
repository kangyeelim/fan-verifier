import React, { useState } from 'react';
import { Container, Image, ListGroup, Row, Col, Alert, Button } from 'react-bootstrap';
import NavBar from './component/NavBar';
import auth from './services/auth';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { Twitter, Facebook, Instagram } from './component/SocialMediaEntry';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import InputForm from './component/InputForm';

export function AlertDimissible(props) {
  const [show, setShow] = useState(true);
  return (
    <Alert show={show} variant="danger" onClose={()=>setShow(false)} dismissible>
      <Alert.Heading>Are you sure you want to delete?</Alert.Heading>
      <p>Close this dialog box if you do not wish to do so or confirm deletion.</p>
      <div className="d-flex justify-content-end">
        <Button onClick={() => props.deleteEntry()} variant="outline-danger">Confirm Deletion</Button>
      </div>
    </Alert>
  );
}

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
    }
    this.deleteEntry = this.deleteEntry.bind(this);
    this.editEntry = this.editEntry.bind(this);
    this.verifyDeletion = this.verifyDeletion.bind(this);
  }

  async deleteEntry() {
    try {
      await axios.delete(`http://localhost:5000/hallOfFameEntries/${this.props.entry._id}`);
      this.props.refreshPage();
    } catch (error) {
      console.error(error);
    }
  }

  verifyDeletion() {
    this.setState({showAlert: true});
  }

  editEntry() {
    console.log(this.props.entry._id);
    this.props.setEntryInfo(this.props.entry._id, this.props.entry.name, this.props.entry.social)
    this.props.isEditing();
  }

  render() {
    if (this.props.entry.social == "twitter") {
      return (
        <div>
        <ListGroup.Item>
          <Row>
            <Col xs>
              <Twitter entry={this.props.entry}/>
            </Col>
            <Col md="auto">
              <a onClick={this.editEntry} style={{alignSelf:'right'}}>
                <FontAwesomeIcon icon={faEdit} style={{alignSelf:'right'}}/>
              </a>
            </Col>
            <Col md="auto">
              <a onClick={this.verifyDeletion} style={{alignSelf:'right'}}>
                <FontAwesomeIcon icon={faTrashAlt} style={{alignSelf:'right'}}/>
              </a>
            </Col>
          </Row>
        </ListGroup.Item>
        { this.state.showAlert && <AlertDimissible deleteEntry={this.deleteEntry}/>}
        </div>
      );
    } else if (this.props.entry.social == "instagram") {
      return (
        <div>
        <ListGroup.Item>
        <Row>
          <Col xs>
            <Instagram entry={this.props.entry}/>
          </Col>
          <Col md="auto">
            <a onClick={this.editEntry} style={{alignSelf:'right'}}>
              <FontAwesomeIcon icon={faEdit} style={{alignSelf:'right'}}/>
            </a>
          </Col>
          <Col md="auto">
            <a onClick={this.verifyDeletion} style={{alignSelf:'right'}}>
              <FontAwesomeIcon icon={faTrashAlt} style={{alignSelf:'right'}}/>
            </a>
          </Col>
        </Row>
        </ListGroup.Item>
        { this.state.showAlert && <AlertDimissible deleteEntry={this.deleteEntry}/>}
        </div>
      );
    } else {
      return (
        <div>
        <ListGroup.Item>
        <Row>
          <Col xs>
            <Facebook entry={this.props.entry}/>
          </Col>
          <Col md="auto">
            <a onClick={this.editEntry} style={{alignSelf:'right'}}>
              <FontAwesomeIcon icon={faEdit} style={{alignSelf:'right'}}/>
            </a>
          </Col>
          <Col md="auto">
            <a onClick={this.verifyDeletion} style={{alignSelf:'right'}}>
              <FontAwesomeIcon icon={faTrashAlt} style={{alignSelf:'right'}}/>
            </a>
          </Col>
        </Row>
        </ListGroup.Item>
        { this.state.showAlert && <AlertDimissible deleteEntry={this.deleteEntry}/>}
        </div>
      );
    }
  }
}

const initialState = {
  isLoggedIn: false,
  entries: null,
  isEditing: false,
  id: null,
  username: null,
  social: null,
}

class Account extends React.Component {
  constructor() {
    super();
    this.state = initialState;
    this.refreshPage = this.refreshPage.bind(this);
    this.isEditing = this.isEditing.bind(this);
    this.setEntryInfo = this.setEntryInfo.bind(this);
  }

  async componentDidMount() {
    if (await auth.isAuthenticated()) {
      this.setState({isLoggedIn: true});
    }
    try {
      var response = await axios.get(`http://localhost:5000/hallOfFameEntries/googleId/${this.props.profile[0].googleId}`);
      this.setState({entries: response.data })
      this.setState({isEditing: false});
      this.setState({social: null});
      this.setState({username: null});
    } catch (error) {
      console.error(error);
    }
  }

  async refreshPage() {
    try {
      this.setState(initialState);
      var response = await axios.get(`http://localhost:5000/hallOfFameEntries/googleId/${this.props.profile[0].googleId}`);
      this.setState({entries: response.data })
    } catch (error) {
      console.error(error);
    }
  }

  isEditing() {
    this.setState({isEditing: true});
  }

  setEntryInfo(id, username, social) {
    this.setState({id: id});
    this.setState({username: username});
    this.setState({social: social});
  }

  render() {
    if (!this.state.isLoggedIn && this.props.profile.length !== 1) {
      return <Redirect to="/"/>
    }
    if (this.state.isEditing) {
      return (
        <div>
          <NavBar history={this.props.history}/>
          <Container style={styles.container}>
            <h3>Edit Hall of Fame entry</h3>
            <p>If you leave the page without submitting, the changes will not be saved.</p>
            <InputForm refreshPage={this.refreshPage} isEdit={true} id={this.state.id} username={this.state.username} social={this.state.social} />
          </Container>
        </div>
      )
    }
    return (
      <div>
      <NavBar history={this.props.history}/>
      <Container style={styles.container}>
        <h3 className="my-4">Account Information</h3>
        <Image style={styles.image} src={this.props.profile[0].imageUrl}/>
        <h6 style={styles.text}>Name: {this.props.profile[0].name}</h6>
        <h6 style={styles.text}>Email: {this.props.profile[0].email}</h6>
        <h6 style={styles.text}>Hall of Fame entries:</h6>
        <ListGroup>
          { this.state.entries && (
            this.state.entries.map(entry => {
               return <Entry
               key={entry.social + entry.name}
               entry={entry}
               refreshPage={this.refreshPage}
               isEditing={this.isEditing}
               setEntryInfo={this.setEntryInfo}
               />;
            })
          )}
        </ListGroup>
      </Container>
      </div>
  );
  }
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginBottom: 20
  },
  text: {
    marginBottom: 20
  },
  container: {
    padding: 30
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}


export default connect(mapStateToProps, {}) (Account);
