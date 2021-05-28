import React, { useState } from "react";
import { Redirect } from "react-router";
import { signupUser } from "./signupUser.js";

import "../App/Style.css";
import "./Signup.css";

const Signup = ({ token }) => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [retype, setRetype] = useState();
  const [error, setError] = useState(true);

  if (!token) {
    const handleSubmit = async (e) => {
      e.preventDefault();
      await signupUser({
        username,
        password,
      });
    };

    const errorCheck = async () => {
      if (retype !== password) {
        setError(true);
      } else {
        setError(false);
      }
      console.log(error);
    };

    const userHandle = (e) => {
      setUserName(e.target.value);
      errorCheck();
    };

    const passHandle = (e) => {
      setPassword(e.target.value);
      errorCheck();
    };

    const retypeHandle = (e) => {
      setRetype(e.target.value);
      errorCheck();
    };

    const buttonHandle = (e) => {
      e.preventDefault();
      if (error) {
        console.log("wtf");
      } else {
        console.log("everything ok");
      }
    };

    const errormsg = () => {
      if (error) {
        return <h1 style={{ color: "white" }}>FUCK YOU</h1>;
      } else {
        return <h1 style={{ color: "white" }}>jk</h1>;
      }
    };

    return (
      <div className="login-wrapper">
        <h1 className="signup-font">
          <span className="normal-font">Sign Up</span>
          <span className="colored-font"> !</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label>
              <span className="credentials-font" style={{ marginTop: "150px" }}>
                Username or Email
              </span>
              <input type="text" className="input-bar" onChange={userHandle} />

              <span className="credentials-font">Password</span>
              <input
                type="password"
                className="input-bar"
                onChange={passHandle}
              />

              <span className="credentials-font">Retype Password</span>
              <input
                type="password"
                className="input-bar"
                onChange={retypeHandle}
              />
            </label>

            <button
              type="submit"
              onClick={buttonHandle}
              className="signup-btn"
              style={{ marginTop: "120px" }}
            >
              Sign Up
            </button>
          </div>
        </form>
        {errormsg()}
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Signup;
