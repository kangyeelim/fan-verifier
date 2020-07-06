import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import NavBar from './component/NavBar';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Twitter() {
  return (
    <div>
      <FontAwesomeIcon icon="fab fa-twitter-square"/>
      <a href={`twitter.com/${this.props.entry.name}`}>@{this.props.entry.name}</a>
    </div>
  )
}

function Facebook() {
  return (
    <div>
      <FontAwesomeIcon icon="fab fa-facebook-square"/>
      <a href={`facebook.com/${this.props.entry.name}`}>@{this.props.entry.name}</a>
    </div>
  )
}

function Instagram() {
  return (
    <div>
      <FontAwesomeIcon icon="fab fa-instagram-square"/>
      <a href={`instagram.com/${this.props.entry.name}`}>@{this.props.entry.name}</a>
    </div>
  )
}

function Entry() {
  if (this.props.entry.social == "twitter") {
    return (
      <ListGroup.Item>
        <Twitter entry={this.props.entry}/>
      </ListGroup.Item>
    );
  } else if (this.props.entry.social == "instagram") {
    return (
      <ListGroup.Item>
        <Instagram entry={this.props.entry}/>
      </ListGroup.Item>
    );
  } else {
    return (
      <ListGroup.Item>
        <Facebook  entry={this.props.entry}/>
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
      <NavBar/>
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
