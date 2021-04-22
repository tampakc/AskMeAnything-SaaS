import React from "react";
import { NavLink } from "react-router-dom";

import "./Style.css";

const Navbar = ({ isAuth, changeAuth }) => {
  const eventHandler = async () => {
    await changeAuth(false);
  };

  const renderAuth = () => {
    if (!isAuth) {
      return (
        <NavLink className="navbar-item" to="/login">
          Login
        </NavLink>
      );
    } else {
      return (
        <NavLink className="navbar-item" to="/" onClick={eventHandler}>
          Log out
        </NavLink>
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
