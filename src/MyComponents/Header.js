import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function head({onLoginClick}) {
  return (

    <Navbar expand="lg" variant="dark" className="bg-transparent py-3">
      <Container>
        <Navbar.Brand href="#home">Jarvis</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">About</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>

          </Nav>
        </Navbar.Collapse>
        {/* Changed ms-auto to ms-5 to shift the entire block further left */}
        <Form className="d-flex align-items-center ms-5 gap-2 mt-2 mt-lg-0">
          <Form.Control
            type="text"
            placeholder="Search..."
            className="rounded bg-light border-0 px-3 py-1 text-dark"
            style={{ maxWidth: '200px' }}
          />
          <Button variant="outline-success" className="px-3 py-1">Search</Button>
          <Button variant="outline-light" className="px-3 py-1" onClick={onLoginClick}>Login</Button>
        </Form>

      </Container>
    </Navbar>
  );
}
