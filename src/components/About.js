// pages/About.js

import React from "react";
import iconNick from "./icon_nick.png";
import iconChris from "./icon_chris.png";

const About = () => (
  <div>
    <h1 className="title">
      <span className="normal-font">Our team at </span>
      <span className="colored-font">askmeanything</span>
      <span className="normal-font">:</span>
    </h1>
    <img className="icon" style={{ marginTop: "150px" }} src={iconNick} />
    <div className="container-name">
      <span className="name-font">Nikolaos Astrinakis</span>
    </div>
    <img className="icon" src={iconChris} />
    <div className="container-name">
      <span className="name-font">Chris Tampakakis</span>
    </div>
  </div>
);

export default About;
