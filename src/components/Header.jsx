import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoApp from "../assets/management.png";
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logoApp}
            width="30"
            height="30"
            className="d-inline-block align-top mx-3"
            alt="React Bootstrap logo"
          />
          <span>NHT Dev</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/users">
              User
            </NavLink>
          </Nav>
          <Nav>
            <NavDropdown title="Settings">
              <NavDropdown.Item>
                <NavLink className="nav-link" to="/login">
                  Log in
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink className="nav-link" to="/logout">
                  Log out
                </NavLink>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
