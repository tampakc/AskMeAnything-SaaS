// pages/Home.js

import React from "react";

import "../App/Style.css";
import "./Home.css";

const Home = () => (
  <div>
    <h1 className="title">
      <span className="normal-font">Welcome to </span>
      <span className="colored-font">askmeanything</span>
      <span className="normal-font">!</span>
    </h1>
    <form>
      <h2 className="form-label">Search for any question:</h2>
      <label>
        <input className="search-bar" type="text" />
        <input className="submit-btn" type="submit" />
      </label>
    </form>
  </div>
);

export default Home;
