import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import LoginNavBar from './LoginNavBar';
import axios from 'axios';
import { LoadingOutlined, CloseCircleOutlined } from '@ant-design/icons';

class Upload extends React.Component {
  constructor() {
    super();
    this.state = {
      images:[],
      isUploading: false,
    }
    this.uploadImage = this.uploadImage.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    console.log(this.props.images);
    if (this.props.images) {
      console.log("here");
      this.setState({images:this.props.images});
    }
  }

  async uploadImage(e) {
    this.setState({isUploading: true});
    const selectedFile = e.target.files[0];
    const data = new FormData();
    data.append('file', selectedFile);
    try {
      const response = await axios.post("http://localhost:5000/images/upload", data, {
        headers: {
        'Content-Type': 'multipart/form-data'
        }
      })
      const imageData = await response.data;
      this.setState({images: this.state.images.concat(imageData)});
      this.props.handleImages(this.state.images);
      this.setState({isUploading: false});
    } catch(error) {
      this.setState({isUploading: false});
      console.error(error);
    }
  }

  handleRemove(imageData) {
    var arr = [];
    arr.push(imageData);
    axios.post('http://localhost:5000/images/delete', {
      images: arr
    })
      .then(res => {
        var updatedState = this.state.images.filter(image => image !== imageData);
        this.setState({images:updatedState});
        this.props.handleImages(this.state.images);
        console.log("Removed image");
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <input type="file" name="image" onChange={this.uploadImage} accept=".jpg, .jpeg, .png" />
          </div>
          <div>
          { this.state.isUploading && <LoadingOutlined style={{fontSize: 30}}/>}
          </div>
          <div>
            { this.state.images.map(imageData => {
                return (
                  <div style={{justifyContent:'center', alignItems:'center', flex:1}}>
                    <img className="d-block w-100"
                    key={imageData.asset_id}
                    src={imageData.secure_url}
                    alt="Image"
                    style={this.props.style}/>
                    <CloseCircleOutlined onClick={() => this.handleRemove(imageData)}/>
                  </div>
                );
              })
            }
          </div>
        </form>
      </div>
    );
  }
}

export default Upload;
