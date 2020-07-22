import React, { useState } from 'react';
import { Container, Card, Alert, Button } from 'react-bootstrap';
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
      isLoggedIn: false
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
        <Transition
          items={true}
          from={{ transform: 'translate3d(-300px,0,0)' }}
          enter={{ transform: 'translate3d(0px,0,0)' }}
          leave={{ opacity:0 }}
        >
        {show => (props) => <animated.div style={props}>
        <Card className="text-center bg-dark text-white" style={styles.photo}>
          <Card.Img fluid="true" src={require("./img/bts-festa1.jpg")} alt="BTS image"/>
          <Card.ImgOverlay>
            <Card.Title as="h2" style={styles.header}>
              <mark style={styles.mark}>
                Welcome!
              </mark>
            </Card.Title>
          </Card.ImgOverlay>
        </Card>
        </animated.div>
        }
        </Transition>
        <Transition
          items={true}
          from={{ transform: 'translate3d(300px,0,0)' }}
          enter={{ transform: 'translate3d(0px,0,0)' }}
          leave={{ opacity:0 }}
        >
        {show => (props) => <animated.div style={props}>
        <Card className="text-dark" style={styles.middleCard0}>
        <Card.Body>
        <Card.Title as="h3" style={{textAlign:'right'}}>
            Would you like to be in our Hall of Fame?
        </Card.Title>
        <Card.Text style={{textAlign:'right'}}>
          Login with your Google account above to do our 2 minute quiz to become a verified BTS-ARMY and get your
          social media username up on our Hall of Fame! If you would like to try the quiz without signing in,
          you can do so too but upon completion you would not be able to get on the Hall of Fame!
        </Card.Text>
        <Card.Text style={{textAlign:'right'}}>
        <GoogleButton
          responseGoogleFailure={this.responseGoogleFailure}
          responseGoogleSuccess={this.responseGoogleSuccess}
        />
        </Card.Text>
        </Card.Body>
        </Card>
        </animated.div>
        }
      </Transition>
      <Transition
        items={true}
        from={{ transform: 'translate3d(-300px,0,0)' }}
        enter={{ transform: 'translate3d(0px,0,0)' }}
        leave={{ opacity:0 }}
      >
      {show => (props) => <animated.div style={props}>
        <Card className="text-dark" style={styles.middleCard1}>
        <Card.Body>
          <Card.Title as="h3">
            Looking to buy or sell something? Perhaps
            looking for fellow BTS-ARMY to share
            the cost for merchandise?
          </Card.Title>
          <Card.Text>
            Head over to our Community to look at posts that are selling,
            buying or sharing to find just what you need! To list something to
            sell, do login using your Google account above!
          </Card.Text>
          <Card.Text>
            <a href="/community" style={styles.link}>Community &gt;</a>
          </Card.Text>
          </Card.Body>
          </Card>
          </animated.div>
          }
        </Transition>
        <Transition
          items={true}
          from={{ transform: 'translate3d(300px,0,0)' }}
          enter={{ transform: 'translate3d(0px,0,0)' }}
          leave={{ opacity:0 }}
        >
        {show => (props) => <animated.div style={props}>
          <Card className="text-dark" style={styles.middleCard2}>
          <Card.Body>
          <Card.Title as="h3" style={{textAlign:'right'}}>
            Want to jam to some BTS music?
          </Card.Title>
          <Card.Text style={{textAlign:'right'}}>
            Try the music tab powered by Deezer which also allows you to search
            for the romanized lyrics to sing along.
          </Card.Text>
          <Card.Text style={{textAlign:'right'}}>
            <a href="/music" style={styles.link}>&lt; Music</a>
          </Card.Text>
          </Card.Body>
        </Card>
        </animated.div>
        }
      </Transition>
      </Container>
      </div>
    );
  }
}

const styles = {
  card: {
    marginTop: 30,
    minWidth: 400,
    borderRadius:0,
    borderWidth:0
  },
  middleCard1: {
    minWidth: 400,
    borderRadius:0,
    backgroundColor: '#cec2ff',
    borderWidth:0
  },
  middleCard2: {
    minWidth: 400,
    borderRadius:0,
    backgroundColor: '#f1d7fc',
    borderWidth:0
  },
  middleCard0: {
    minWidth: 400,
    borderRadius:0,
    backgroundColor: '#dad7fc',
    borderWidth:0
  },
  photo: {
    minWidth: 400,
    borderRadius:0,
    borderWidth:0
  },
  link: {
    color: 'black',
    fontSize: 18,
    textDecoration: 'underline',
    textDecorationColor: 'white',
    fontWeight: 'bold'
  },
  error: {
    textAlign: 'center',
    marginTop: 10,
    color: 'red'
  },
  header: {
    color: 'white',
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
