import React from 'react';
import { Container, Row, Col, OverlayTrigger, Tooltip, ListGroup } from 'react-bootstrap';
import NavBar from './component/NavBar';
import { Redirect } from 'react-router-dom';
import { PostEntry, ImageCarousel } from './component/Post';
import auth from './services/auth';
import axios from 'axios';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { AlertDimissible } from './Account';
import { FullscreenExitOutlined } from '@ant-design/icons';
import { Spring, Transition, animated } from 'react-spring/renderprops';

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
    }
    this.deletePost = this.deletePost.bind(this);
    this.editPost = this.editPost.bind(this);
    this.verifyDeletion = this.verifyDeletion.bind(this);
  }

  async deletePost() {
    try {
      if (this.props.post.images && this.props.post.images.length > 0) {
        await axios.post('http://localhost:5000/images/delete', {
          images: this.props.post.images
        })
      }
      await axios.delete(`http://localhost:5000/posts/${this.props.post._id}`);
      this.props.refreshPage();
    } catch (error) {
      console.error(error);
    }
  }

  verifyDeletion() {
    this.setState({showAlert: true});
  }

  editPost() {
    this.props.history.push({
      pathname:"/createPost",
      state: {post:this.props.post}
    })
  }

  render() {
    return (
      <div style={{backgroundColor:'white', marginBottom:5}}>
        <PostEntry key={this.props.post._id} post={this.props.post} showImages={this.props.showImages}/>
        <ListGroup.Item style={{marginTop:-30, maxHeight:50, borderColor: 'white'}} className="shadow-sm">
        <Row style={{marginLeft: 10, marginRight:10, alignSelf:'right'}}>
          <Col>
          </Col>
          <Col md="auto">
            <a onClick={this.editPost}>
              <FontAwesomeIcon icon={faEdit} style={{alignSelf:'right'}}/>
            </a>
          </Col>
          <Col md="auto">
            <a onClick={this.verifyDeletion}>
              <FontAwesomeIcon icon={faTrashAlt} style={{alignSelf:'right'}}/>
            </a>
          </Col>
        </Row>
        { this.state.showAlert && <AlertDimissible deleteEntry={this.deletePost}/>}
        </ListGroup.Item>
      </div>
    );
  }
}

class Drafts extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      posts: [],
      showAlert: false,
      isShowingImagesFull: false,
      imagesToShow: null
    };
    this.refreshPage = this.refreshPage.bind(this);
    this.showImages = this.showImages.bind(this);
  }

  async componentDidMount() {
    if (await auth.isAuthenticated()) {
      this.setState({isLoggedIn: true});
    }
    try {
      var response = await axios.get(`http://localhost:5000/posts/drafts/${this.props.profile[0].googleId}`);
      this.setState({posts: response.data })
    } catch (error) {
      console.error(error);
    }
  }

  async refreshPage() {
    try {
      var response = await axios.get(`http://localhost:5000/posts/drafts/${this.props.profile[0].googleId}`);
      this.setState({posts: response.data })
    } catch (error) {
      console.error(error);
    }
  }

  showImages(images) {
    this.setState({isShowingImagesFull:!this.state.isShowingImagesFull});
    this.setState({imagesToShow:images});
  }

  render() {
    if (!this.state.isLoggedIn && this.props.profile.length !== 1) {
      return <Redirect to="/"/>
    }
    if (this.state.isShowingImagesFull) {
      return (
        <div style={{display:"flex", flexDirection:"column"}}>
        <div style={{marginBottom:-40, zIndex:"50"}}>
        <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip>
            Exit fullscreen
          </Tooltip>
        }>
          <FullscreenExitOutlined onClick={() => this.showImages(null)} style={styles.screenIcon}/>
        </OverlayTrigger>
        </div>
        {this.state.imagesToShow && (
          <ImageCarousel images={this.state.imagesToShow} height="700"/>
        )}
        </div>
      );
    }
    return (
      <div>
      <NavBar history={this.props.history} activeKey={0}/>
      <Container style={styles.messageContainer}>
        <Transition
          items={true}
          from={{ transform: 'translate3d(-300px,0,0)' }}
          enter={{ transform: 'translate3d(0px,0,0)' }}
          leave={{ opacity:0 }}
        >
        {show => (props) => <animated.div style={props}>
            <h1 className="my-4">Drafts</h1>
          </animated.div>
        }
        </Transition>
        <ListGroup>
        { this.state.posts.map(post => {
          return <Entry key={post._id} history={this.props.history} refreshPage={this.refreshPage} post={post} showImages={this.showImages}/>
        })}
        </ListGroup>
      </Container>
      </div>
  );
  }
}

const styles = {
  messageContainer:{
    marginBottom: 30
  },
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps, {}) (Drafts);
