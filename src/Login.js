import React, { useState } from 'react';
import { Container, Card, Alert, Button, Image, Row, Col } from 'react-bootstrap';
import LoginNavBar from './component/LoginNavBar';
import auth from './services/auth';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateProfile, deleteProfile } from './redux/actions';
import backgroundImg from './img/bg.png';
import { Spring, Transition, animated } from 'react-spring/renderprops';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

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
        <Card className="text-center bg-dark text-white shadow-lg" style={styles.photo}>
          <div style={{borderColor:'#d786f0', borderWidth:'2px', borderStyle:'solid'}}>
            <div style={{height:20, backgroundColor:'#dec3ff', textAlign:'right'}}>
              <FontAwesomeIcon icon={faTimes} style={{fontSize:14, marginRight:10, color:'#d786f0'}}/>
            </div>
          </div>
          <div style={{borderColor:'#d786f0', borderWidth:'2px', borderStyle:'solid', borderTop:'none'}}>
          <Card.Img fluid="true" src={require("./img/bts-festa1.jpg")} alt="BTS image"/>
          </div>
          <Card.ImgOverlay>
          <Spring
            config={{delay:1000}}
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}>
            {props => <div style={props}>
            <Card.Title as="h2" style={styles.header}>
              <mark style={styles.mark}>
                Welcome!
              </mark>
            </Card.Title>
            </div>}
          </Spring>
          </Card.ImgOverlay>
        </Card>
        </animated.div>
        }
        </Transition>
        <Transition
          items={true}
          from={{ transform: 'translate3d(300px,0,0)' }}
          enter={{ transform: 'translate3d(0px,0,0)' }}
          leave={{ transform: 'translate3d(-300px,0,0)' }}
        >
        {show => (props) => <animated.div style={props}>
        <Card className="text-dark shadow-lg" style={styles.middleCard0}>
        <div style={{borderColor:'#d786f0', borderWidth:'2px', borderStyle:'solid'}}>
          <div style={{height:20, backgroundColor:'#dad7fc', textAlign:'right'}}>
            <FontAwesomeIcon icon={faTimes} style={{fontSize:14, marginRight:10, color:'#d786f0'}}/>
          </div>
        </div>
        <div style={{borderColor:'#d786f0', borderWidth:'2px', borderStyle:'solid', borderTop:'none'}}>
        <Card.Body>
        <Row>
        <Col style={{maxWidth:'40%'}}>
        <Image fluid src={require("./img/social_girl.svg")} style={{marginLeft:20}}/>
        </Col>
        <Col mstyle={{maxWidth:'60%'}}>
        <Card.Title as="h3" style={{textAlign:'right'}}>
          <span className="u--highlight" style={{background:'linear-gradient(180deg, rgba(255,255,255,0) 65%, #c5c2ff 65%)', height:'50%', display:'inline'}}>
          Would you like to be in our Hall of Fame?
          </span>
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
        </Col>
        </Row>
        </Card.Body>
        </div>
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
        <Card className="text-dark shadow-lg" style={styles.middleCard1}>
        <div style={{borderColor:'#d786f0', borderWidth:'2px', borderStyle:'solid'}}>
          <div style={{height:20, backgroundColor:'#cec2ff', textAlign:'right'}}>
            <FontAwesomeIcon icon={faTimes} style={{fontSize:14, marginRight:10, color:'#d786f0'}}/>
          </div>
        </div>
        <div style={{borderColor:'#d786f0', borderWidth:'2px', borderStyle:'solid', borderTop:'none'}}>
        <Card.Body>
          <Row>
          <Col style={{maxWidth:'60%'}}>
          <Card.Title as="h3">
            <span className="u--highlight" style={{background:'linear-gradient(180deg, rgba(255,255,255,0) 65%, #ceb3ff 65%)', height:'50%', display:'inline'}}>
            Looking to buy or sell something? Perhaps
            looking to share
            the cost for merchandise?
            </span>
          </Card.Title>
          <Card.Text>
            Head over to our Community to look at posts that are selling,
            buying or sharing to find just what you need! To list something to
            sell, do login using your Google account above!
          </Card.Text>
          <Card.Text>
            <a href="/community" style={styles.link}>Community &gt;</a>
          </Card.Text>
          </Col>
          <Col style={{maxWidth:'40%', textAlign:'right'}}>
          <Image fluid src={require("./img/shopping.svg")} style={{marginRight:10}}/>
          </Col>
          </Row>
          </Card.Body>
          </div>
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
          <Card className="text-dark shadow-lg" style={styles.middleCard2}>
          <div style={{borderColor:'#d786f0', borderWidth:'2px', borderStyle:'solid'}}>
            <div style={{height:20, backgroundColor:'#f1d7fc', textAlign:'right'}}>
              <FontAwesomeIcon icon={faTimes} style={{fontSize:14, marginRight:10, color:'#d786f0'}}/>
            </div>
          </div>
          <div style={{borderColor:'#d786f0', borderWidth:'2px', borderStyle:'solid', borderTop:'none'}}>
          <Card.Body>
          <Row>
          <Col style={{maxWidth:'40%'}}>
          <Image fluid src={require("./img/listening.svg")} style={{marginLeft:10}}/>
          </Col>
          <Col style={{alignText:'right', maxWidth:'60%'}}>
          <Card.Title as="h3" style={{textAlign:'right'}}>
          <span className="u--highlight" style={{background:'linear-gradient(180deg, rgba(255,255,255,0) 65%, #e7bfff 65%)', height:'50%', display:'inline'}}>
            Want to jam to some BTS music?
          </span>
          </Card.Title>
          <Card.Text style={{textAlign:'right'}}>
            Try the music tab powered by Deezer which also allows you to search
            for the romanized lyrics to sing along.
          </Card.Text>
          <Card.Text style={{textAlign:'right'}}>
            <a href="/music" style={styles.link}>&lt; Music</a>
          </Card.Text>
          </Col>
          </Row>
          </Card.Body>
          </div>
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
    borderWidth:0,
    marginTop: 20
  },
  middleCard2: {
    minWidth: 400,
    borderRadius:0,
    backgroundColor: '#f1d7fc',
    borderWidth:0,
    marginTop: 20
  },
  middleCard0: {
    minWidth: 400,
    borderRadius:0,
    backgroundColor: '#dad7fc',
    borderWidth:0,
    marginTop: 20
  },
  photo: {
    minWidth: 400,
    borderRadius:0,
    borderWidth:0,
    marginTop:20
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
    backgroundColor: '#d786f0',
    color: 'white'
  },
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}


export default connect(mapStateToProps, {updateProfile:updateProfile, deleteProfile:deleteProfile}) (Login);
