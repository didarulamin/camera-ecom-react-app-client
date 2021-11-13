import {
  faShoppingCart,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

// import useFirebase from "../../hooks/useFirebase";
import useAuth from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

import "./header.css";

//navbar component
const Header = () => {
  const { user, logOut, displayInitials, admin, cart } = useAuth();
  const nameInitials = displayInitials();
  let history = useHistory();

  console.log(cart, "header");
  let total = cart.reduce(function (acc, curr) {
    return acc + curr.price * 1;
  }, 0);
  console.log(total);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="fs-1 mx-5" href="#home">
            <p className="text-primary fs-2 text-start">Cameraly </p>
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto fs-5 align-items-center ">
            <LinkContainer to="/home" className="nav-item-animation">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/explore" className="nav-item-animation">
              <Nav.Link>Explore</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/contact" className="nav-item-animation">
              <Nav.Link>Contact</Nav.Link>
            </LinkContainer>

            <Nav.Link onClick={() => history.push("/checkout")}>
              <span>
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="mx-1 text-dark"
                />
                <span className="text-primary ">
                  {total.toFixed(2)}({cart.length} items)
                </span>
              </span>
            </Nav.Link>

            {!user.email ? (
              <NavDropdown
                title={
                  <div className="pull-left roundedCircle">
                    <FontAwesomeIcon icon={faUserCircle} size="2x" />
                  </div>
                }
                id="nav-dropdown"
              >
                <NavDropdown.Item
                  onClick={() => history.push("/login")}
                  className=""
                  eventKey="4.1"
                >
                  Login
                </NavDropdown.Item>

                <NavDropdown.Item
                  onClick={() => history.push("/register")}
                  className=""
                  eventKey="4.1"
                >
                  Register
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown
                title={
                  <div className="pull-left roundedCircle">
                    {/*     {user.photoURL ? (
                      <img
                        className="thumbnail-image rounded-circle "
                        src={user.photoURL}
                        alt="user pic"
                        width="50px"
                      />
                    ) : (
                      <span className=" rounded-circle bg-info p-3">
                        {nameInitials}
                      </span>
                    )} */}
                    <span className=" rounded-circle bg-info p-3 text-white">
                      {user.displayName.slice(0, 1)}
                    </span>
                  </div>
                }
                id="nav-dropdown"
              >
                <NavDropdown.Item eventKey="4.1">
                  <div className="d-flex justify-content-center align-items-center flex-column">
                    <img
                      className="thumbnail-image rounded-circle "
                      src={user.photoURL}
                      alt="user pic"
                      width="50px"
                    />
                    <p>{user?.displayName}</p>
                  </div>
                </NavDropdown.Item>

                <NavDropdown.Item
                  onClick={() => history.push("/profileUpdate")}
                  className=" my-1"
                  eventKey="4.1"
                >
                  Edit Profile
                </NavDropdown.Item>

                {admin.email ? (
                  <NavDropdown.Item
                    onClick={() => history.push("/dashboard")}
                    className=" my-1"
                    eventKey="4.1"
                  >
                    Dashboard
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item
                    onClick={() => history.push("/userDashboard")}
                    className=" my-1"
                    eventKey="4.1"
                  >
                    Dashboard
                  </NavDropdown.Item>
                )}

                <NavDropdown.Item onClick={logOut} className=" " eventKey="4.2">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
