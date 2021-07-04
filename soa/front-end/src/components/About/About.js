// pages/About.js

import React from "react";
import iconNick from "./icon_nick.png";
import iconChris from "./icon_chris.png";

import "../App/Style.css";
import "./About.css";

const About = () => (
  <div className="wrapper-about">
    <h1 className="title">
      <span className="normal-font">Our team at </span>
      <span className="colored-font">askmeanything</span>
      <span className="normal-font">:</span>
    </h1>
    <div className="info-wrapper">
      <img
        className="icon"
        alt="Grumpy Cat"
        style={{ marginTop: "150px" }}
        src={iconNick}
      />
      <span className="name-font">Nikolaos Astrinakis</span>
    </div>
    <div className="info-wrapper">
      <img className="icon" alt="Sad Chihuahua" src={iconChris} />
      <span className="name-font">Chris Tampakakis</span>
    </div>
  </div>
);

export default About;
