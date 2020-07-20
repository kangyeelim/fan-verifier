import React from 'react';
import { Container, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import NavBar from './component/NavBar';
import { Redirect } from 'react-router-dom';
import auth from './services/auth';
import axios from 'axios';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { AlertDimissible } from './Account';
import { FullscreenExitOutlined } from '@ant-design/icons';
import { PostEntry, ImageCarousel, PostBottomBar } from './component/Post';

class Favourites extends React.Component {
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
    this.unfavouritePost = this.unfavouritePost.bind(this);
  }

  async componentDidMount() {
    if (await auth.isAuthenticated()) {
      this.setState({isLoggedIn: true});
    }
    try {
      const response = await axios.get(`http://localhost:5000/favourites/myfavourites/${this.props.profile[0].googleId}`);
      const ids = await response.data[0].postIds;
      var posts = [];
      var max = ids.length;
      if (ids.length > 2000) {
        max = 2000;
      }
      for (var i = 0; i < max; i++) {
        const res = await axios.get(`http://localhost:5000/posts/${ids[i]}`);
        const post = res.data;
        posts.push(post);
      }
      this.setState({posts: posts })
    } catch (error) {
      console.error(error);
    }
  }

  async refreshPage() {
    try {
      const response = await axios.get(`http://localhost:5000/favourites/myfavourites/${this.props.profile[0].googleId}`);
      const ids = await response.data[0].postIds;
      var posts = [];
      var max = ids.length;
      if (ids.length > 2000) {
        max = 2000;
      }
      for (var i = 0; i < max; i++) {
        const res = await axios.get(`http://localhost:5000/posts/${ids[i]}`);
        const post = res.data;
        posts.push(post);
      }
      this.setState({posts: posts })
    } catch (error) {
      console.error(error);
    }
  }

  async unfavouritePost(postId) {
    const response = await axios.get(`http://localhost:5000/posts/${postId}`);
    const post = await response.data;
    var favouritedBy = await post.favouritedBy;
    var newIds = await favouritedBy.filter(id => {return this.props.profile[0].googleId !== id});
    try {
      await axios.post(`http://localhost:5000/posts/update/${postId}`, {
        title:post.title,
        description:post.description,
        tag:post.tag,
        images:post.images,
        isPosted:post.isPosted,
        social:post.social,
        name:post.name,
        favouritedBy:newIds,
        date:post.postedAt,
      });
    } catch (err) {
      console.error(err);
    }
    const response2 = await axios.get(`http://localhost:5000/favourites/myfavourites/${this.props.profile[0].googleId}`);
    var favouritePostIds = await response2.data[0].postIds;
    var newPostIds = await favouritePostIds.filter(id => { return id !== postId});
    try {
      await axios.post(`http://localhost:5000/favourites/updateBy/googleId/${this.props.profile[0].googleId}`, {
        name:this.props.profile[0].name,
        postIds:newPostIds,
        googleId:this.props.profile[0].googleId,
      });
    } catch (err) {
      console.error(err);
    }
    await this.refreshPage();
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
      <NavBar history={this.props.history}/>
      <Container style={styles.messageContainer}>
        <h1 className="my-4">Favourites</h1>
        { this.state.posts.map(post => {
          return (
            <div key={post._id} style={{backgroundColor:'white'}}>
              <PostEntry post={post} showImages={this.showImages}/>
              <PostBottomBar post={post} favouritesNum={post.favouritedBy.length} isLiked={true}
              unfavouritePost={this.unfavouritePost} isLoggedIn={this.state.isLoggedIn}/>
            </div>
          )
        })}
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

export default connect(mapStateToProps, {}) (Favourites);
