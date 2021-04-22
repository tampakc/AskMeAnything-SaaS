// pages/About.js

import React from "react";
import iconNick from "./icon_nick.png";
import iconChris from "./icon_chris.png";

const About = () => (
  <div>
    <h1 className="title is-1">This is the About Page</h1>
    <p>Our team at `askmeanything`:</p>
    <img src={iconNick} />
    <h4>Nikolaos Astrinakis</h4>
    <img src={iconChris} />
    <h4>Chris Tampakakis</h4>
  </div>
);

export default About;
