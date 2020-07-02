import React from 'react';
import { Col, InputGroup, FormControl, Form } from 'react-bootstrap';

class InputForm extends React.Component {
  render() {
    return (
      <Form>
        <Form.Row className="align-items-center">
          <Col xs="auto">
           <Form.Control
             as="select"
             custom
             id="social-media"
             style={styles.select}
           >
             <option value="twitter">Twitter</option>
             <option value="instagram">Instagram</option>
             <option value="facebook">Facebook</option>
           </Form.Control>
          </Col>
          <Col xs="auto">
            <InputGroup className="mb-2">
              <InputGroup.Prepend>
                <InputGroup.Text>@</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl id="username" placeholder="Username" />
            </InputGroup>
          </Col>
        </Form.Row>
      </Form>
    );
  }
}

const styles = {
  select: {
    position: 'relative',
    top:-3,
  }
}

export default InputForm;
