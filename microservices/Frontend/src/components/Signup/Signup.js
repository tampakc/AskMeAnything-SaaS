import React, { useState } from "react";
import { Redirect } from "react-router";
import axios from "axios";

import "../App/Style.css";
import "./Signup.css";

require("dotenv").config();

const Signup = ({ token }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [retype, setRetype] = useState();

  const userURL = process.env.REACT_APP_UserService;

  if (!token) {
    const handleSubmit = async (e) => {
      e.preventDefault();

      if (password === retype && password) {
        alert("Creating user, please wait");
        const response = await axios.post(
          userURL + "/signup",
          {
            username,
            password,
          },
          { validateStatus: false }
        );

        alert(response.data);
        setUsername("");
        setPassword("");
        setRetype("");
        window.location.reload();
      }
    };

    const renderError = () => {
      if (password !== retype) {
        return (
          <h5 className="normal-font">
            <span className="error-msg">Passwords dont match</span>
          </h5>
        );
      }
    };

    return (
      <div className="login-wrapper">
        <h1 className="login-font">
          <span className="normal-font">Sign Up</span>
          <span className="colored-font"> !</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <span className="credentials-font" style={{ marginTop: "150px" }}>
            Username or Email
          </span>
          <input
            type="text"
            className="input-bar"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            minLength="5"
          />

          <span className="credentials-font">Password</span>
          <input
            type="password"
            className="input-bar"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            minLength="8"
          />

          <span className="credentials-font">Retype Password</span>

          <input
            type="password"
            className="input-bar"
            onChange={(e) => {
              setRetype(e.target.value);
            }}
            minLength="8"
          />

          {renderError()}
          <button type="submit" className="signup-btn-2">
            Sign Up
          </button>
        </form>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Signup;
