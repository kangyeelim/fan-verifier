import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LoginNavBar from './component/LoginNavBar';
import NavBar from './component/NavBar';
import axios from 'axios';
import { Transition, Spring, animated, config } from 'react-spring/renderprops'
import auth from './services/auth';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

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
        <NavBar history={this.props.history} activeKey={5} isNotAnimate={true}/>
      )}
      { this.props.profile.length !== 1 && !this.state.isLoggedIn && (
        <LoginNavBar activeKey={5} isNotAnimate={true}/>
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
          <div style={{borderColor:'#d786f0', borderWidth:'2px', borderStyle:'solid'}} className="shadow">
            <div style={{height:20, backgroundColor:'#dec3ff', textAlign:'right'}}>
              <FontAwesomeIcon icon={faTimes} style={{fontSize:14, marginRight:10, color:'#d786f0'}}/>
            </div>
          </div>
          <div style={{borderColor:'#d786f0', backgroundColor:'#dec3ff', borderWidth:'2px', borderStyle:'solid', borderTop:'none', marginBottom:10}} className="shadow">
          <img class="responsiveImg"
          src="https://ibighit.com/bts/images/bts/tour/love_yourself/tour-kv.png"
          alt="BTS WORLD TOUR LOVE YOURSELF SPEAK YOURSELF"
          style={{userSelect:'auto', width:'100%'}}/>
          </div>
        </animated.div>
        }
        </Transition>
        {this.state.tourList.map(item => {
          return (
            <div style={{borderColor:'#d786f0', borderWidth:'2px', borderStyle:'solid', width:'100%', marginBottom:10, backgroundColor:'#cec2ff'}} className="shadow">
            <Row>
            <Col md="auto">
              <p style={dateTop}>{item.date}</p>
              <p style={dateBottom}>{item.year}</p>
            </Col>
            <Col>
              <hr style={{marginTop:35}}/>
            </Col>
            <Col md="auto" style={{justifyContent: "end"}}>
              <p style={city}>{item.city}</p>
              <p style={venue}>{item.venue}</p>
            </Col>
            </Row>
            </div>);
        })}
        <Transition
          items={true}
          from={{ transform: 'translate3d(-300px,0,0)' }}
          enter={{ transform: 'translate3d(0px,0,0)' }}
          leave={{ opacity:0 }}
        >
        {show => (props) => <animated.div style={props}>
          <h1 className="my-4" style={{marginTop:30}}>Other Schedule</h1>
        </animated.div>
        }
        </Transition>
        <embed src="https://ibighit.com/bts/eng/schedule/" style={{...scheduleFrame}}/>
        </Container>
      </div>
    )
  }
}

/*<Transition
  items={this.state.tourList}
  //initial=null
  keys={this.state.tourList.map(item=> item.id)}
  from={{ overflow: 'hidden', height: 0, opacity: 0 }}
  enter={{ height: 60, opacity: 1, background: '#f1d7fc' }}
  leave={{ height: 0, opacity: 0, background: '#c23369' }}
  update={{ background: '#cec2ff' }}
  trail={1}>
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
</Transition>*/

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
  fontSize: 14,
  textTransform: 'uppercase'
}

const dateBottom = {
  marginBottom: 18,
  fontSize: 12,
  marginTop: -15,
  marginLeft:15,
  textTransform: 'uppercase'
}

const city = {
  marginTop: 15,
  fontWeight: 'bold',
  marginRight: 15,
  fontSize: 16,
  textAlign: 'right',
  textTransform: 'uppercase'
}

const venue = {
  marginBottom: 15,
  fontSize: 14,
  marginTop: -15,
  marginRight:15,
  textAlign: 'right',
  textTransform: 'uppercase'
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
