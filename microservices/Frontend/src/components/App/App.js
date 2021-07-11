import React, { useState } from "react";
import { Redirect } from "react-router";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "../Navbar/Navbar.js";
import Home from "../Home/Home.js";
import About from "../About/About.js";
import Login from "../Login/Login.js";
import Signup from "../Signup/Signup.js";
import Dashboard from "../Dashboard/Dashboard.js";
import Question from "../Question/Question.js";
import Keyword from "../Keyword/Keyword.js";
import AskQuestion from "../AskQuestion/AskQuestion.js";
import AllQuestions from "../AllQuestions/AllQuestions.js";

import useToken from "./useToken";

import "./App.css";

require("dotenv").config();

function App() {
  const { token, setToken } = useToken();
  const [username, setUsername] = useState("");

  const tokenHandle = (value) => {
    setToken(value.token);
    setUsername(value.username);
  };

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
            <Login token={token} tokenHandle={tokenHandle} />
          </Route>
          <Route path="/signup">
            <Signup token={token} />
          </Route>
          <Route path="/dashboard">
            <Dashboard token={token} username={username} />
          </Route>
          <Route path="/question/:id">
            <Question />
          </Route>
          <Redirect from="/keyword/:tag/" to="/keyword/:tag/1" exact />
          <Route path="/keyword/:tag/:page?">
            <Keyword />
          </Route>
          <Route path="/askquestion">
            <AskQuestion token={token} />
          </Route>
          <Redirect from="/questions-list/" to="/questions-list/1" exact />
          <Route path="/questions-list/:page?">
            <AllQuestions />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
