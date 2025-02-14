import { useState } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";

function TopBar() {
  const [city, setCity] = useState("Milano");

  return (
    <>
      <Navbar expand="lg" className="bg-info">
        <Container fluid>
          <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
              <Nav.Link href="homepage">Home</Nav.Link>
              <Nav.Link href="#action2">Radar</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                onChange={(e) => setCity(e.target.value)}
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default TopBar;
