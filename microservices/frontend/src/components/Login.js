// pages/Login.js

import React from "react";
import { Redirect } from "react-router-dom";

const Login = ({ isAuth, changeAuth }) => {
  function submitHandler(e) {
    e.preventDefault();
    changeAuth(true);
    console.log(isAuth);
  }

  if (isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1 className="login-font">Log In!</h1>
      <form>
        <label>
          <span className="credentials-font" style={{ marginTop: "10%" }}>
            Username or Email
          </span>
          <input className="input-bar" type="text" />
          <span className="credentials-font" style={{ marginTop: "20px" }}>
            Password
          </span>
          <input className="input-bar" type="password" />
        </label>
        <input
          type="submit"
          className="submit-btn"
          style={{
            marginLeft: "450px",
            marginTop: "30px",
            width: "385px",
          }}
          value="Log In"
          onClick={submitHandler}
        />
      </form>
    </div>
  );
};

export default Login;
