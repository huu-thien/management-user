import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logoApp from "../assets/management.png";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleLogoutRedux } from "../redux/actions/userActions";

const Header = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.account);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(handleLogoutRedux());
  };

  useEffect(() => {
    if (user && !user.auth) {
      navigate("/");
      toast.success("Log out successfully !!");
    }
  }, [user]);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink className="nav-link d-flex align-items-center" to="/">
          <img
            src={logoApp}
            width="30"
            height="30"
            className="d-inline-block align-top mx-1"
            alt="React Bootstrap logo"
          />
          <span>
            <strong style={{ color: "#f06b1c", marginRight: "15px" }}>
              NHT Dev
            </strong>
          </span>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {((user && user.auth) || window.location.pathname === "/") && (
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
                  <span className="nav-link" style={{ marginRight: "20px" }}>
                    <strong>Welcome {user.email}</strong>
                  </span>
                )}

                {!(user && user.auth) ? (
                  <NavLink className="btn btn-outline-primary" to="/login">
                    Log in
                  </NavLink>
                ) : (
                  <NavLink
                    className="btn btn-outline-danger"
                    onClick={() => handleLogout()}
                  >
                    Log out
                  </NavLink>
                )}
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
