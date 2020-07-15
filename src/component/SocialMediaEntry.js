import React from 'react';
import { ListGroup} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagramSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'

export function Twitter(props) {
  return (
    <div>
      <FontAwesomeIcon icon={faTwitterSquare} style={styles.icon}/>
      <a style={styles.text} href={`https://twitter.com/${props.entry.name}`}>@{props.entry.name}</a>
    </div>
  )
}

export function Facebook(props) {
  return (
    <div>
      <FontAwesomeIcon icon={faFacebookSquare} style={styles.icon}/>
      <a style={styles.text} href={`https://facebook.com/${props.entry.name}`}>@{props.entry.name}</a>
    </div>
  )
}

export function Instagram(props) {
  return (
    <div>
      <FontAwesomeIcon icon={faInstagramSquare} style={styles.icon}/>
      <a style={styles.text} href={`https://instagram.com/${props.entry.name}`}>@{props.entry.name}</a>
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
        <Facebook entry={props.entry}/>
      </ListGroup.Item>
    );
  }
}

const styles = {
  icon: {
    marginRight: 10,
    fontSize: 18
  },
  text: {
    fontSize: 16
  }
}
