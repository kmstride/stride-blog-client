import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Card,
  NavDropdown,
  Button,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LogOutBtn from "../components/shared/LogOutBtn";
import { useDispatch } from "react-redux";
import { setToken } from "../feature/rootSlice";
import { useLoggedInQuery } from "../feature/userApi";
import Loading from "../components/shared/Loading";

function DashboardLayout() {
  const token = localStorage.getItem("authToken");
  const { data, isLoading } = useLoggedInQuery();
  const dispatch = useDispatch();
  if (token) {
    dispatch(setToken(token));
  }
  const links = (
    <>
      <LinkContainer to={"/dashboard/my-posts"}>
        <Nav.Link>My Posts</Nav.Link>
      </LinkContainer>
      <LinkContainer to={"/dashboard/create-post"}>
        <Nav.Link>Create Post</Nav.Link>
      </LinkContainer>
      {data?.using === "manual" && (
        <LinkContainer to={"/dashboard/change-password"}>
          <Nav.Link>Change Password</Nav.Link>
        </LinkContainer>
      )}
      <LinkContainer to={"/"}>
        <Nav.Link>Home</Nav.Link>
      </LinkContainer>
      <LogOutBtn />
    </>
  );
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <LinkContainer to={"/dashboard"}>
          <Navbar.Brand>Dashboard</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto d-lg-none">{links}</Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container fluid>
        <Row>
          <Col md={2} className="bg-light sidebar d-none d-lg-block">
            <Nav defaultActiveKey="/home" className="flex-column">
              {links}
            </Nav>
          </Col>
          <Col md={10} className="main-content">
            <h3 className="text-center text-decoration-underline">
              My Dashboard
            </h3>
            <Outlet />
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default DashboardLayout;
