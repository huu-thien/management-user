import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoApp from "../assets/management.png";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import { useContext, useEffect, useState } from "react";

const Header = () => {
  const { logout, user } = useContext(UserContext);

  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Log out successfully !!");
  };

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
          {(user && user.auth || window.location.pathname === "/") &&(
            <>
              <Nav className="me-auto">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
              <NavLink className="nav-link" to="/users">
                User Management
              </NavLink>
            </Nav>
            <Nav>
              {user && user.email && (
                <span className="nav-link">
                  <strong>Welcome {user.email}</strong>
                </span>
              )}
              <NavDropdown title="Settings">
                {!(user && user.auth) ? (
                  <NavLink className="dropdown-item" to="/login">
                    Log in
                  </NavLink>
                ) : (
                  <NavDropdown.Item onClick={() => handleLogout()}>
                    Log out
                  </NavDropdown.Item>
                )}
              </NavDropdown>
            </Nav>
            </>
          )}
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
