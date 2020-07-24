import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LoginNavBar from './component/LoginNavBar';
import NavBar from './component/NavBar';
import axios from 'axios';
import { Transition, Spring, animated, config } from 'react-spring/renderprops'
import auth from './services/auth';
import { connect } from 'react-redux';

class Schedule extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      tourList:[],
      isLoading: true,
      isLoggedIn: false
    }
  }

  async componentDidMount() {
    if (await auth.isAuthenticated()) {
      this.setState({isLoggedIn: true});
    }
    const response = await axios.get('http://localhost:5000/schedules/tour');
    for (var i = 0; i < response.data.length; i++) {
      response.data[i].id = i + 1;
    }
    this.setState({tourList:response.data});
    this.setState({loading: false});
  }

  render() {
    return (
      <div>
      { this.props.profile.length === 1 && this.state.isLoggedIn && (
        <NavBar history={this.props.history} activeKey={5}/>
      )}
      { this.props.profile.length !== 1 && !this.state.isLoggedIn && (
        <LoginNavBar activeKey={5}/>
      )}
      <Container>
        <Transition
          items={true}
          from={{ transform: 'translate3d(-300px,0,0)' }}
          enter={{ transform: 'translate3d(0px,0,0)' }}
          leave={{ opacity:0 }}
        >
        {show => (props) => <animated.div style={props}>
          <h1 className="my-4">Tour Schedule</h1>
          <img class="responsiveImg"
          src="https://ibighit.com/bts/images/bts/tour/love_yourself/tour-kv.png"
          alt="BTS WORLD TOUR LOVE YOURSELF SPEAK YOURSELF"
          style={{userSelect:'auto', width:'100%'}}/>
        </animated.div>
        }
        </Transition>
        <Transition
          items={this.state.tourList}
          keys={this.state.tourList.map(item=> item.id)}
          //initial={null}
          from={{ overflow: 'hidden', height: 0, opacity: 0 }}
          enter={{ height: 60, opacity: 1, background: '#f1d7fc' }}
          leave={{ height: 0, opacity: 0, background: '#c23369' }}
          update={{ background: '#cec2ff' }}
          trail={5}>
          {item => styles => (
            <animated.div style={{...defaultStyles, ...styles}} className="shadow-lg">
              <div style={{width:'100%'}}>
              <Row>
              <Col md="auto">
                <p style={{...dateTop}}>{item.date}</p>
                <p style={{...dateBottom}}>{item.year}</p>
              </Col>
              <Col>
                <hr style={{marginTop:35}}/>
              </Col>
              <Col md="auto" style={{justifyContent: "end"}}>
                <p style={{...city}}>{item.city}</p>
                <p style={{...venue}}>{item.venue}</p>
              </Col>
              </Row>
              </div>
            </animated.div>
          )}
        </Transition>
        <Transition
          items={true}
          from={{ transform: 'translate3d(-300px,0,0)' }}
          enter={{ transform: 'translate3d(0px,0,0)' }}
          leave={{ opacity:0 }}
        >
        {show => (props) => <animated.div style={props}>
          <h1 className="my-4">Other Schedule</h1>
        </animated.div>
        }
        </Transition>
        <embed src="https://ibighit.com/bts/eng/schedule/" style={{...scheduleFrame}}/>
        </Container>
      </div>
    )
  }
}

const defaultStyles = {
  overflow: 'hidden',
  width: '100%',
  display: 'flex',
  textTransform: 'uppercase',
  alignItems: 'center',
  marginTop:15,
  marginBottom: 15
}

const dateTop = {
  marginTop: 18,
  fontWeight: 'bold',
  marginLeft: 15,
  fontSize: 14
}

const dateBottom = {
  marginBottom: 18,
  fontSize: 12,
  marginTop: -15,
  marginLeft:15
}

const city = {
  marginTop: 15,
  fontWeight: 'bold',
  marginRight: 15,
  fontSize: 16,
  textAlign: 'right'
}

const venue = {
  marginBottom: 15,
  fontSize: 14,
  marginTop: -15,
  marginRight:15,
  textAlign: 'right'
}

const scheduleFrame = {
  width:'100%',
  height:2500
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps, {}) (Schedule);
