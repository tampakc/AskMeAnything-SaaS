//App.js

import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar.js";
import Home from "./components/Home.js";
import About from "./components/About.js";
import Login from "./components/Login.js";

import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Navbar isAuth={loggedIn} changeAuth={setLoggedIn} />
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/login">
            <Login isAuth={loggedIn} changeAuth={setLoggedIn} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
