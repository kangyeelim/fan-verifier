import React from 'react';
import { Container, Form, Button, Image } from 'react-bootstrap';
import LoginNavBar from './LoginNavBar';
import axios from 'axios';

class Upload extends React.Component {
  constructor() {
    super();
    this.state = {
      isUploaded:false,
      images:[]
    }
    this.uploadImage = this.uploadImage.bind(this);
  }

  async uploadImage(e) {
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
    } catch(error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div>
      <Container>
        <h1>Upload</h1>
        <form>
          <h3>React File Upload</h3>
          <div className="form-group">
            <input type="file" name="image" onChange={this.uploadImage} accept=".jpg, .jpeg, .png" />
          </div>
          <div>
            { this.state.images.map(imageData => {
                return <Image key={imageData.asset_id} src={imageData.secure_url} alt="Image"/>
              })
            }
          </div>
        </form>
      </Container>
      </div>
    );
  }
}

export default Upload;
