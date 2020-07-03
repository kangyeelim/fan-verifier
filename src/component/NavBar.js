import React from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import auth from '../services/auth';
import { useHistory } from 'react-router-dom';

export default function NavBar() {

  let history= useHistory();
    return (
      <Navbar bg="light" expand="lg" className="shadow">
        <Navbar.Brand href="#">BTS-ARMY Verifier</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/home">Quiz</Nav.Link>
            <Nav.Link href="/hallOfFame">Hall of Fame</Nav.Link>
            <Form inline>
              <Button onClick={() => {
                auth.logout(() => {
                  history.push("/");
                })
              }} variant="outline-success">Logout</Button>
            </Form>
         </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
}
