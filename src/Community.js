import React from 'react';
import { Container, ListGroup, Row, Col, Form, FormControl,
  Button, Image, Badge, Popover, OverlayTrigger, Tooltip } from 'react-bootstrap';
import NavBar from './component/NavBar';
import LoginNavBar from './component/LoginNavBar';
import axios from 'axios';
import { connect } from 'react-redux';
import auth from './services/auth';
import { FormOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import { PostEntry, ImageCarousel, PostBottomBar } from './component/Post';

export function FilterPopover(props) {
  return (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Filter and Search</Popover.Title>
      <Popover.Content>
      <Form style={{margin: 20}}>
       <FormControl
        as="select"
        id="tag"
        onChange={props.handleFilterInput}
        value={props.filter}
        className="mr-sm-2"
        style={{marginBottom:20}}
        >
          <option value="">Show posts that are</option>
          <option value="selling">Selling</option>
          <option value="buying">Buying</option>
          <option value="sharing">Sharing</option>
          <option value="others">Others</option>
        </FormControl>
        <FormControl onChange={props.handleKeywordInput} value={props.keyword} type="text" placeholder="Keyword(s)" className="mr-sm-2" style={{marginBottom:20}}/>
        <Button onClick={props.apply} variant="outline-success">Apply</Button>
      </Form>
      </Popover.Content>
    </Popover>
  );
}

const LinkFilterPopover = React.forwardRef((props, ref) => <FilterPopover innerRef={ref} {...props} />);

class Community extends React.Component {

  constructor() {
    super();
    this.state= {
      isLoggedIn: false,
      filter: "",
      posts: null,
      filteredPosts: null,
      keyword: "",
      isShowingImagesFull: false,
      imagesToShow: null
    }
    this.apply = this.apply.bind(this);
    this.handleFilterInput = this.handleFilterInput.bind(this);
    this.handleNewPost = this.handleNewPost.bind(this);
    this.handleKeywordInput = this.handleKeywordInput.bind(this);
    this.reset = this.reset.bind(this);
    this.showImages = this.showImages.bind(this);
    this.favouritePost = this.favouritePost.bind(this);
    this.unfavouritePost = this.unfavouritePost.bind(this);
  }

  async componentDidMount() {
    if (await auth.isAuthenticated()) {
      this.setState({isLoggedIn: true});
    }
    const response = await axios.get('http://localhost:5000/posts/isPosted/true');
    const posts = await response.data;
    this.setState({filteredPosts:posts});
    this.setState({posts:posts});
  }

  async apply() {
    var posts = [];
    if (this.state.filter !== "" && this.state.keyword === "") {
      const response = await axios.get(`http://localhost:5000/posts/tag/${this.state.filter}`);
      posts = await response.data;
    } else if (this.state.filter === "" && this.state.keyword !== "") {
      const response = await axios.get(`http://localhost:5000/posts/title/${this.state.keyword}/description/${this.state.keyword}`);
      posts = await response.data;
    } else if (this.state.filter !== "" && this.state.keyword !== "") {
      const response = await axios.get(`http://localhost:5000/posts/title/${this.state.keyword}/description/${this.state.keyword}/tag/${this.state.filter}`);
      posts = await response.data;
    } else {
      posts = this.state.posts;
    }
    this.setState({filteredPosts:posts});
  }

  handleFilterInput(e) {
    this.setState({filter: e.target.value});
  }

  handleNewPost() {
    this.props.history.push("/createPost");
  }

  handleKeywordInput(e) {
    this.setState({keyword:e.currentTarget.value});
  }

  reset() {
    this.setState({filteredPosts: this.state.posts});
    this.setState({keyword:""});
    this.setState({filter:""})
  }

  showImages(images) {
    this.setState({isShowingImagesFull:!this.state.isShowingImagesFull});
    this.setState({imagesToShow:images});
  }

  async favouritePost(postId) {
    var response = await axios.get(`http://localhost:5000/posts/${postId}`);
    var post = await response.data;
    var favouritedBy = await post.favouritedBy;
    favouritedBy.push(this.props.profile[0].googleId);
    try {
      await axios.post(`http://localhost:5000/posts/update/${postId}`, {
        title:post.title,
        description:post.description,
        tag:post.tag,
        images:post.images,
        isPosted:post.isPosted,
        social:post.social,
        name:post.name,
        favouritedBy:favouritedBy,
        date:post.date,
      });
    } catch (err) {
      console.error(err);
    }
    var response = await axios.get(`http://localhost:5000/favourites/myfavourites/${this.props.profile[0].googleId}`);
    var favouritePostIds = await response.data.postIds;
    console.log(this.props.profile[0].googleId)
    console.log(await favouritePostIds);
    await favouritePostIds.push(postId);
    try {
      await axios.post(`http://localhost:5000/favourites/updateBy/googleId/${this.props.profile[0].googleId}`, {
        name:this.props.profile[0].name,
        postIds:favouritePostIds,
        googleId:this.props.profile[0].googleId,
      });
    } catch (err) {
      console.error(err);
    }
    this.apply();
  }

  async unfavouritePost(postId) {
    var response = await axios.get(`http://localhost:5000/posts/${postId}`);
    var post = await response.data;
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
        date:post.date,
      });
    } catch (err) {
      console.error(err);
    }
    var response = await axios.get(`http://localhost:5000/favourites/myfavourites/${this.props.profile[0].googleId}`);
    var favouritePostIds = await response.data.postIds;
    console.log(this.props.profile[0].googleId)
    console.log(await favouritePostIds);
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
    this.apply();
  }

  render() {
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
      { this.props.profile.length === 1 && this.state.isLoggedIn && (
        <NavBar history={this.props.history}/>
      )}
      { this.props.profile.length !== 1 && !this.state.isLoggedIn && (
        <LoginNavBar/>
      )}
      <Container style={styles.container}>
        <Row>
          <Col>
            <h1 className="my-4">Community</h1>
          </Col>
          <Col md={2}>
          </Col>
          <Col md="auto" style={{padding:10}}>
            <>
            <OverlayTrigger
            trigger="click"
            placement="right"
            overlay={
              <div style={{width:400}}>
              <LinkFilterPopover
              apply={this.apply}
              handleFilterInput={this.handleFilterInput}
              handleKeywordInput={this.handleKeywordInput}
              filter={this.state.filter}
              keyword={this.state.keyword}/>
              </div>
            }>
              <Button style={styles.form} variant="outline-success">Filters</Button>
            </OverlayTrigger>
            </>
            <Button style={styles.icon} onClick={this.reset} variant="outline-success">Clear Filters</Button>
            { this.state.isLoggedIn && (<Button style={styles.icon} onClick={this.handleNewPost} variant="outline-primary">Make New Post</Button>)}
          </Col>
        </Row>
        {this.state.filteredPosts && (
          <ListGroup>
          {this.state.filteredPosts.map(post => {
            var mygoogleId = this.props.profile[0].googleId;
            var googleIds = post.favouritedBy;
            var isLiked = false;
            if (googleIds.includes(mygoogleId)) {
              isLiked = true;
            }
            return (
              <div key={post._id} style={{backgroundColor:'white'}}>
                <PostEntry post={post} showImages={this.showImages}/>
                <PostBottomBar post={post} favouritesNum={post.favouritedBy.length} isLiked={isLiked}
                favouritePost={this.favouritePost} unfavouritePost={this.unfavouritePost} isLoggedIn={this.state.isLoggedIn}/>
              </div>
            )
          })}
          </ListGroup>
        )}
      </Container>
      </div>
  );
  }
}

const styles = {
  form: {
    marginTop: 20,
    alignSelf: 'right',
    marginBottom: 20
  },
  icon: {
    marginRight: 10,
    fontSize: 18
  },
  text: {
    fontSize: 16
  },
  icon: {
    marginLeft: 30
  },
  container: {
    marginBottom:30
  },
  screenIcon: {
    fontSize: 20,
    marginTop: 20,
    alignSelf: 'right',
    color: 'white'
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps, {}) (Community);
