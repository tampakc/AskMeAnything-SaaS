import React from "react";
import { NavLink } from "react-router-dom";

import "../App/Style.css";
import "./Navbar.css";

const Navbar = ({ token, setToken }) => {
  const handleLogout = () => {
    setToken(null);
  };

  const renderAuth = () => {
    if (!token) {
      return (
        <>
          <NavLink
            className="navbar-login"
            style={{ marginRight: "40px" }}
            exact
            to="/signup"
          >
            Signup
          </NavLink>
          <NavLink className="navbar-login" exact to="/login">
            Login
          </NavLink>
        </>
      );
    } else {
      return (
        <>
          <NavLink
            className="navbar-item"
            activeClassName="selected"
            to="/dashboard"
          >
            Profile
          </NavLink>
          <NavLink
            className="navbar-login"
            style={{ marginRight: "40px" }}
            exact
            to="/"
            onClick={handleLogout}
          >
            Log out
          </NavLink>
        </>
      );
    }
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="container">
        <span className="navbar-logo">askmeanything</span>
        <NavLink
          className="navbar-item"
          activeClassName="selected"
          exact
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          className="navbar-item"
          activeClassName="selected"
          exact
          to="/about"
        >
          About
        </NavLink>
        {renderAuth()}
      </div>
    </nav>
  );
};

export default Navbar;
