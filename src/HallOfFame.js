import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import NavBar from './component/NavBar';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagramSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { Store } from './services/Store';

function Twitter(props) {
  return (
    <div>
      <FontAwesomeIcon icon={faTwitterSquare} style={{marginRight:10}}/>
      <a href={`twitter.com/${props.entry.name}`}>@{props.entry.name}</a>
    </div>
  )
}

function Facebook(props) {
  return (
    <div>
      <FontAwesomeIcon icon={faFacebookSquare} style={{marginRight:10}}/>
      <a href={`facebook.com/${props.entry.name}`}>@{props.entry.name}</a>
    </div>
  )
}

function Instagram(props) {
  return (
    <div>
      <FontAwesomeIcon icon={faInstagramSquare} style={{marginRight:10}}/>
      <a href={`instagram.com/${props.entry.name}`}>@{props.entry.name}</a>
    </div>
  )
}

function Entry(props) {
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
      entries: null
    }
  }

  componentDidMount() {
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
      <NavBar history={this.props.history}/>
      <Container>
        <h1 className="my-4">Hall of Fame</h1>
        {this.state.entries && (
          <ListGroup>
          {this.state.entries.map(entry => {
             return <Entry entry={entry}/>
          })}
          </ListGroup>
        )}
      </Container>
      </div>
  );
  }
}

export default HallOfFame;
