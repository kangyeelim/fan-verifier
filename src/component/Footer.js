import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

var style = {
    backgroundColor: "#dec3ff",
    textAlign: "center",
    padding: "10px",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
    postion: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

var phantom = {
  display: 'block',
  padding: '10px',
  width: '100%',
}

function Footer(props) {
    return (
        <div>
            <div style={phantom}/>
            <div style={style} class="shadow-lg">
              <Row style={{alignItems:'center'}}>
              <Col md="auto">
              <div style={{display:'flex'}}>
              <p style={{marginRight:'10px'}}>Contact Developer</p>
              <a href='/contact'>
              <FontAwesomeIcon icon={faPaperPlane} style={{alignSelf:'right'}}/>
              </a>
              </div>
              </Col>
              <Col>
              <div style={{display:'flex'}}>
              <p style={{marginRight:'10px'}}>Terms of Use</p>
              <a href='/contact'>
              <FontAwesomeIcon icon={faInfo} style={{alignSelf:'right'}}/>
              </a>
              </div>
              </Col>
              </Row>
            </div>
        </div>
    )
}

export default Footer
