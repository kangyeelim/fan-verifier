import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LoginNavBar from './component/LoginNavBar';
import NavBar from './component/NavBar';
import axios from 'axios';
import { Transition, animated, config } from 'react-spring/renderprops'
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
        <NavBar history={this.props.history} activeKey={4}/>
      )}
      { this.props.profile.length !== 1 && !this.state.isLoggedIn && (
        <LoginNavBar activeKey={4}/>
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
        </animated.div>
        }
        </Transition>
        <Transition
          items={this.state.tourList}
          keys={this.state.tourList.map(item=> item.id)}
          //initial={null}
          from={{ overflow: 'hidden', height: 0, opacity: 0 }}
          enter={{ height: 50, opacity: 1, background: '#f1d7fc' }}
          leave={{ height: 0, opacity: 0, background: '#c23369' }}
          update={{ background: '#cec2ff' }}
          trail={5}>
          {item => styles => (
            <animated.div style={{ ...defaultStyles, ...styles }} className="shadow-lg">
              <Row>
              <Col>
                  <p>{item.date} {item.year} </p>
              </Col>
              <Col md="auto">
              <p> {item.city} {item.venue}</p>
              </Col>
              </Row>
            </animated.div>
          )}
        </Transition>
        </Container>
      </div>
    )
  }
}

const defaultStyles = {
  overflow: 'hidden',
  width: '100%',
  display: 'flex',
  fontFamily: "'Kanit', sans-serif",
  textTransform: 'uppercase',
  alignItems: 'center',
  margin:15,
  color: 'black',
  textDecoration: "underline",
  textDecorationColor: "white",
  fontWeight: 'bold',
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps, {}) (Schedule);
