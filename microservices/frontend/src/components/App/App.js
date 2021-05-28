import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "../Navbar/Navbar.js";
import Home from "../Home/Home.js";
import About from "../About/About.js";
import Login from "../Login/Login.js";
import Signup from "../Signup/Signup.js";
import Dashboard from "../Dashboard/Dashboard.js";

import useToken from "./useToken";

import "./App.css";

function App() {
  const { token, setToken } = useToken();

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Navbar token={token} setToken={setToken} />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/login">
            <Login token={token} setToken={setToken} />
          </Route>
          <Route path="/signup">
            <Signup token={token} />
          </Route>
          <Route path="/dashboard">
            <Dashboard token={token} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
