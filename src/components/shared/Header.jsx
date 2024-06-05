import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import LogOutBtn from "./LogOutBtn";

function Header() {
  const token = localStorage.getItem("authToken");
  return (
    <header>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <LinkContainer to={"/"}>
            <Navbar.Brand>Awesome Blog</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <LinkContainer to={"/dashboard"}>
                <Nav.Link>Dashboard</Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/about"}>
                <Nav.Link>About Us</Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/contact"}>
                <Nav.Link>Contact</Nav.Link>
              </LinkContainer>
            </Nav>
            {
              token ? <LogOutBtn />: <LinkContainer to={"/login"}>
              <Button>Login</Button>
            </LinkContainer>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
