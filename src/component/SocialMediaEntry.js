import React from 'react';
import { ListGroupItem } from 'react-bootstrap';
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
      <ListGroupItem>
        <Twitter entry={props.entry}/>
      </ListGroupItem>
    );
  } else if (props.entry.social == "instagram") {
    return (
      <ListGroupItem>
        <Instagram entry={props.entry}/>
      </ListGroupItem>
    );
  } else {
    return (
      <ListGroupItem>
        <Facebook entry={props.entry}/>
      </ListGroupItem>
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
