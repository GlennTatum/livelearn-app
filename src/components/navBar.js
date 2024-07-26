import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Logo from "./liveLearnLogo.png";

import { Form, Button } from "react-bootstrap";


function NavBar() {
  const navigate = useNavigate();
  const { setIsSignedIn, setUserType, userType } = useAuth();

  const handleLogout = () => {
    setIsSignedIn(false);
    setUserType("");
    navigate("/Login");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand
            as={Link}
            to={userType === "teacher" ? "/teacher" : "/student"}
          >
            <img
              src={Logo}
              width="40" // Adjust width as needed
              height="40" // Adjust height as needed
              className="d-inline-block align-top" // Aligns the image with the text
              alt="LiveLearn Logo"
            />{' '}
            LiveLearn
          </Navbar.Brand>
          <Nav className="me-auto gap-4">
            {userType === "teacher" && (
              <Nav.Link href="/teacher/LearnForm" className="">
                LearnForm
              </Nav.Link>
            )}
            {userType === "teacher" && (
              <Nav.Link href="/teacher/feedback" className="">
                FeedbackGenerator
              </Nav.Link>
            )}
            {userType === "student" && (
              <Nav.Link href="/student/lab" className="">
                Student Lab
              </Nav.Link>
            )}
            {userType === "student" && (
              <Nav.Link href="/student/exambuilder" className="">
                Student Study Exam Builder
              </Nav.Link>
            )}
            {userType === "student" && (
              <Nav.Link href="/student/contentreview" className="">
                Content Helper
              </Nav.Link>
            )}
            {userType === "student" && (
              <Nav.Link href="/student/studentprofile" className="">
                Profile
              </Nav.Link>
            )}

            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search for features"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default NavBar;
