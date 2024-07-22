import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const { isSignedIn, setIsSignedIn } = useAuth();

  const handleLogout = () => {
    setIsSignedIn(false);
    navigate("/Login");
  };
  return (
    <>
      {isSignedIn && (
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container fluid>
            <Navbar.Brand href="/">LiveLearn</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto gap-4">
                <Nav.Link href="/LearnForm" className="">
                  LearnForm
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
      <br />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};
export default Layout;
