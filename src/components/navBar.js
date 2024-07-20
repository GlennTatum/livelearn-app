"use client";
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavBar() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">LiveLearn</Navbar.Brand>
          <Nav className="me-auto gap-4">
            <Nav.Link href="/LearnForm" className="">
              LearnForm
            </Nav.Link>
            <Nav.Link href="/StudentLab" className="">
              Student Lab
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default NavBar;
