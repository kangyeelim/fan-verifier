import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import LoginNavBar from './LoginNavBar';

const API_URL = process.env.REACT_APP_CLOUDINARY;

class Upload extends React.Component {
  constructor() {
    super();
    this.state = {
      isUploaded:false,
      images: []
    }
    this.uploadImage = this.uploadImage.bind(this);
  }

  uploadImage(e) {
    const files = Array.from(e.target.files);
    const formData = new FormData();

    files.forEach((item, i) => {
      formData.append(i, item)
    });

    fetch(`http://localhost:5000/images/upload`, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(images => {
      this.setState({
        isUploaded: true,
        images
      })
    })

  }

  render() {
    return (
      <div>
      <Container>
        <h1>Upload</h1>
        <form>
          <h3>React File Upload</h3>
            <div className="form-group">
              <input type="file" onChange={this.uploadImage} multiple accept=".jpg, .jpeg, .png" />
             </div>
          <div>
            { this.state.isUploaded && this.state.images.map(image => {
              return <img src={image.url} alt="Image"/>;
            })}
          </div>
        </form>
      </Container>
      </div>
    );
  }
}

export default Upload;
