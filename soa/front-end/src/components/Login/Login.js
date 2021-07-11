import React, { useState } from "react";
import { Redirect } from "react-router";
import "../App/Style.css";
import "./Login.css";
import axios from "axios";

require("dotenv").config();

const Login = ({ token, tokenHandle }) => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const authURL = process.env.REACT_APP_AuthenticationService;

  if (!token) {
    const handleSubmit = async (e) => {
      e.preventDefault();

      await axios
        .post(authURL + "/login", {
          username,
          password,
        })
        .then((response) => {
          tokenHandle(response.data);
        });
    };

    return (
      <div className="login-wrapper">
        <div className="signup-redirect">
          <span
            className="normal-font"
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginLeft: "110px",
            }}
          >
            OR
          </span>

          <form action="/signup">
            <button type="submit" className="signup-btn">
              Sign Up
            </button>
          </form>
        </div>

        <h1 className="login-font">
          <span className="normal-font">Log In</span>
          <span className="colored-font"> !</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <span className="vl"></span>
            <label>
              <span className="credentials-font" style={{ marginTop: "150px" }}>
                Username or Email
              </span>
              <input
                type="text"
                className="input-bar"
                onChange={(e) => setUserName(e.target.value)}
              />

              <span className="credentials-font">Password</span>
              <input
                type="password"
                className="input-bar"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <button
              type="submit"
              className="login-btn"
              style={{ marginTop: "20px" }}
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Login;
