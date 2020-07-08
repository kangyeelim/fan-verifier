import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import NavBar from './component/NavBar';
import LoginNavBar from './component/LoginNavBar';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagramSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { connect } from 'react-redux';
import auth from './services/auth';

export function Twitter(props) {
  return (
    <div>
      <FontAwesomeIcon icon={faTwitterSquare} style={{marginRight:10}}/>
      <a href={`https://twitter.com/${props.entry.name}`}>@{props.entry.name}</a>
    </div>
  )
}

export function Facebook(props) {
  return (
    <div>
      <FontAwesomeIcon icon={faFacebookSquare} style={{marginRight:10}}/>
      <a href={`https://facebook.com/${props.entry.name}`}>@{props.entry.name}</a>
    </div>
  )
}

export function Instagram(props) {
  return (
    <div>
      <FontAwesomeIcon icon={faInstagramSquare} style={{marginRight:10}}/>
      <a href={`https://instagram.com/${props.entry.name}`}>@{props.entry.name}</a>
    </div>
  )
}

export function Entry(props) {
  if (props.entry.social == "twitter") {
    return (
      <ListGroup.Item>
        <Twitter entry={props.entry}/>
      </ListGroup.Item>
    );
  } else if (props.entry.social == "instagram") {
    return (
      <ListGroup.Item>
        <Instagram entry={props.entry}/>
      </ListGroup.Item>
    );
  } else {
    return (
      <ListGroup.Item>
        <Facebook  entry={props.entry}/>
      </ListGroup.Item>
    );
  }

}

class HallOfFame extends React.Component {

  constructor() {
    super();
    this.state= {
      entries: null,
      isLoggedIn: false,
    }
  }

  async componentDidMount() {
    if (await auth.isAuthenticated()) {
      this.setState({isLoggedIn: true});
    }
    axios.get('http://localhost:5000/hallOfFameEntries/')
      .then(response => {
        this.setState({ entries: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <div>
      { this.props.profile.length === 1 && this.state.isLoggedIn && (
        <NavBar history={this.props.history}/>
      )}
      { this.props.profile.length !== 1 && !this.state.isLoggedIn && (
        <LoginNavBar/>
      )
      }
      <Container>
        <h1 className="my-4">Hall of Fame</h1>
        {this.state.entries && (
          <ListGroup>
          {this.state.entries.map(entry => {
             return <Entry key={entry.social + entry.name} entry={entry}/>
          })}
          </ListGroup>
        )}
      </Container>
      </div>
  );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps, {}) (HallOfFame);
