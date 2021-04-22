// pages/Home.js

import React from "react";

const Home = () => (
  <div>
    <h1 className="title">Welcome to `askmeanything`!</h1>
    <form>
      <label>
        Search for any question:
        <input type="text" />
      </label>
      <input type="submit" />
    </form>
  </div>
);

export default Home;
