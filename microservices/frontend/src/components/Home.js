// pages/Home.js

import React from "react";

const Home = () => (
  <div>
    <h1 className="title">
      <span className="normal-font">Welcome to </span>
      <span className="colored-font">askmeanything</span>
      <span className="normal-font">!</span>
    </h1>
    <form>
      <label>
        <h2 className="form-label">Search for any question:</h2>
        <input className="search-bar" type="text" />
      </label>
      <input className="submit-btn" type="submit" />
    </form>
  </div>
);

export default Home;
