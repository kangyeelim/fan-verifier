import React from 'react';
import { Container, ListGroup, Image, Carousel, Badge, OverlayTrigger,
  Tooltip, Row, Col } from 'react-bootstrap';
import { FullscreenOutlined } from '@ant-design/icons';
import { Entry } from './SocialMediaEntry';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShareSquare } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

export function ImageCarousel(props) {
  return (
    <Carousel style={styles.carousel}>
      {props.images.map(image => {
        return (
          <Carousel.Item key={image.public_id} style={{backgroundColor:'grey'}}>
          <img
            onLoad={props.measure}
            key={image.public_id}
            className="d-block w-100"
            src={image.secure_url}
            alt="Image"
            height={props.height}
            style={{width:"undefined", maxHeight: '100%', objectFit: "contain"}}
          />
          </Carousel.Item>);
      })}
    </Carousel>
  );
}

export function PostEntry(props) {
    return (
      <ListGroup.Item style={{borderColor: 'white'}} className="shadow-lg">
        <p>User {props.post.googleName} posted:</p>
        <h5>{props.post.title} <Badge variant="secondary">{props.post.tag}</Badge></h5>
        <h6>{props.post.description}</h6>
        { props.post.social !== "" && (
          <div style={{marginTop: 20}}>
          <p>DM me via</p>
          <Entry entry={props.post}/>
          </div>
        )}
        { props.post.images && (
          <div style={{display:"flex", flexDirection:"column"}}>
            <div style={{marginBottom:-30, zIndex:"50"}}>
            <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                Show in fullscreen
              </Tooltip>
            }>
              <div style={{float:'right'}}>
              <FullscreenOutlined onClick={()=> props.showImages(props.post.images)} style={styles.screenIcon}/>
              </div>
            </OverlayTrigger>
            </div>
            <ImageCarousel measure={props.measure} images={props.post.images} height="300"/>
          </div>
        )}
        <p>posted on: {new Date(props.post.postedAt).toLocaleDateString()} {new Date(props.post.postedAt).toLocaleTimeString()}</p>
      </ListGroup.Item>
    );
}

export function PostBottomBar(props) {
  return (
    <ListGroup.Item style={{marginTop:-30, maxHeight:50, borderColor: 'white'}} className="shadow-sm">
    <Row style={{marginLeft: 10, marginRight:10, alignSelf:'right'}}>
      <Col>
      </Col>
      <Col md="auto">
        <p>{props.favouritesNum}</p>
      </Col>
      <Col md="auto">
        { !props.isLoggedIn && (
          <FontAwesomeIcon icon={farHeart} style={{alignSelf:'right'}}/>
        ) }
        { props.isLiked && props.isLoggedIn && (
          <a onClick={() => props.unfavouritePost(props.post._id)}>
          <FontAwesomeIcon icon={faHeart} style={{alignSelf:'right'}}/>
          </a>
        ) }
        { !props.isLiked && props.isLoggedIn && (
          <a onClick={() => props.favouritePost(props.post._id)}>
          <FontAwesomeIcon icon={farHeart} style={{alignSelf:'right'}}/>
          </a>
        ) }

      </Col>
      <Col md="auto">
        <a onClick={props.sharePost}>
          <FontAwesomeIcon icon={faShareSquare} style={{alignSelf:'right'}}/>
        </a>
      </Col>
    </Row>
    </ListGroup.Item>
  )
}

const styles = {
  carousel: {
    marginBottom: 10,
    marginTop: 10
  },
  screenIcon: {
    fontSize: 20,
    marginTop: 20,
    alignSelf: 'right',
    color: 'white'
  }
}
