import React, { useState } from 'react';
import { Container, Card, Alert } from 'react-bootstrap';
import LoginNavBar from './component/LoginNavBar';
import auth from './services/auth';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateProfile, deleteProfile } from './redux/actions';
import backgroundImg from './img/bg.png';
import { Transition, animated } from 'react-spring/renderprops';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function AlertDimissible() {
  const [show, setShow] = useState(true);
  return (
    <Alert show={show} variant="danger" onClose={()=>setShow(false)} dismissible>
      <Alert.Heading>Login failed. Please try again.</Alert.Heading>
    </Alert>
  );
}

function Title() {
  return (
    <Card.Title as="h3" style={styles.header}>
      Would you like to be in our Hall of Fame?
    </Card.Title>
  );
}

function Description() {
  return (
    <Card.Text style={styles.cardText}>
      <mark style={styles.mark}>
      Login to do our 2 minute quiz to become a verified BTS-ARMY and get your
      social media username up on our Hall of Fame! Our Hall of Fame is renewed monthly so do
      check back again next month to get back on it. If you would like to try the quiz without signing in,
      you can do so too but upon completion you would not be able to get on the Hall of Fame!
      </mark>
    </Card.Text>
  );
}

function GoogleButton(props) {
  return (
    <GoogleLogin
    clientId= {GOOGLE_CLIENT_ID}
    buttonText="Login with Google"
    onSuccess={props.responseGoogleSuccess}
    onFailure={props.responseGoogleFailure}
    cookiePolicy={'single_host_origin'}
    responseType='code,token'
    />
  );
}


class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      isFailure: false,
      isSuccess: false,
      isLoggedIn: false,
      items:[]

    }
    this.responseGoogleSuccess = this.responseGoogleSuccess.bind(this);
    this.responseGoogleFailure = this.responseGoogleFailure.bind(this);
  }

  async componentDidMount() {
      if (await auth.isAuthenticated()) {
        this.setState({isLoggedIn: true});
      } else {
        this.props.deleteProfile();
      }
  }

  responseGoogleSuccess(response) {
    //check if googleId has corresponding token, if yes update
    //if googleId no corresponding token, then added
    //check if googleId exists in user db, if yes update
    //if googleId do not exist, then add
    auth.login(response)
    this.props.updateProfile(response.profileObj);
    this.setState({isSuccess:true});
  }

  responseGoogleFailure(response) {
    this.setState({isFailure: true});
  }

  render() {
    if (this.state.isLoggedIn && this.props.profile.length === 1) { //add if store has the profile check
      return <Redirect to="/home"/>
    }
    if (this.state.isSuccess) {
      return <Redirect to="/home"/>
    }
    return (
      <div>
      <LoginNavBar activeKey={0}/>
      <Container>
      { this.state.isFailure && (
        <AlertDimissible/>
      )}

        <Card className="bg-dark text-white" style={styles.card}>
          <Card.Img fluid="true" src={require("./img/bts-festa.jpg")} alt="BTS image"/>
          <Card.ImgOverlay>
            <Transition
              items={true}
              from={{ position: 'absolute', overflow: 'hidden', height: 0 }}
              enter={[{ height: 'auto' }]}
              leave={{ height: 0 }}
            >
              {show => (props) => <animated.div style={props}>
                <Title/>
                <Description/>
                <GoogleButton
                  responseGoogleFailure={this.responseGoogleFailure}
                  responseGoogleSuccess={this.responseGoogleSuccess}/>
                </animated.div>
              }
            </Transition>
          </Card.ImgOverlay>
        </Card>
      </Container>
      </div>
    );
  }
}

const styles = {
  card: {
    marginTop: 30,
    marginBottom: 30,
    minWidth: 400
  },
  cardText: {
    marginRight: 50,
  },
  error: {
    textAlign: 'center',
    marginTop: 10,
    color: 'red'
  },
  header: {
    color: '#e8d9fa'
  },
  mark: {
    backgroundColor: 'black',
    color: 'white'
  },
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}


export default connect(mapStateToProps, {updateProfile:updateProfile, deleteProfile:deleteProfile}) (Login);
