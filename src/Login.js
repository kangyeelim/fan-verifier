import React from 'react';
import { Container, Card } from 'react-bootstrap';
import LoginNavBar from './component/LoginNavBar';
import auth from './services/auth';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateProfile, deleteProfile } from './redux/actions';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      isFailure: false,
      isSuccess: false,
      isLoggedIn: false,
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
    console.log(response.profileObj);
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
      <LoginNavBar/>
      { this.state.isFailure && (
        <h3>Login failed. Please try again.</h3>
      )}
      <Container>
        <Card className="bg-dark text-white" style={styles.card}>
          <Card.Img fluid src={require("./img/bts-festa.jpg")} alt="BTS image"/>
          <Card.ImgOverlay>
            <Card.Title as="h3" style={styles.header}>
              Would you like to be in our Hall of Fame?
            </Card.Title>
            <Card.Text style={styles.cardText}>
              <mark style={styles.mark}>
              Login to do our 2 minute quiz to become a verified BTS-ARMY and get your
              social media username up on our Hall of Fame! Our Hall of Fame is renewed monthly so do
              check back again next month to get back on it. If you would like to try the quiz without signing in,
              you can do so too but upon completion you would not be able to get on the Hall of Fame!
              </mark>
            </Card.Text>
            <GoogleLogin
            style={styles.loginBtn}
            clientId= {GOOGLE_CLIENT_ID}
            buttonText="Login with Google"
            onSuccess={this.responseGoogleSuccess}
            onFailure={this.responseGoogleFailure}
            cookiePolicy={'single_host_origin'}
            responseType='code,token'
            />
          </Card.ImgOverlay>
        </Card>
      </Container>
      </div>
  );
  }
}

const styles = {
  card: {
    margin: 30,
  },
  cardText: {
    marginRight: 50,
  },
  loginBtn: {
    alignSelf: 'center',
  },
  header: {
    color: 'white'
  },
  mark: {
    backgroundColor: 'black',
    color: 'white'
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}


export default connect(mapStateToProps, {updateProfile:updateProfile, deleteProfile:deleteProfile}) (Login);
