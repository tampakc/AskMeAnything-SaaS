// pages/Login.js

import React from "react";

const Login = ({ isAuth, changeAuth }) => {
  function submitHandler(e) {
    e.preventDefault();
    changeAuth(true);
    console.log(isAuth);
  }

  return (
    <div>
      <h3 className="logo">`askmeanything`</h3>
      <h1 className="title">Log In!</h1>
      <form>
        <label>
          <span>Username or Email</span>
          <input type="text" />
          <span>Password</span>
          <input type="password" />
        </label>
        <input type="submit" value="Log In" onClick={submitHandler} />
      </form>
    </div>
  );
};

export default Login;
