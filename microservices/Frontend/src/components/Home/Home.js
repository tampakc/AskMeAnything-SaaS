// pages/Home.js

import React, { useState, useEffect } from "react";
import axios from "axios";

import "../App/Style.css";
import "./Home.css";

require("dotenv").config();

const Home = () => {
  const [loadingKey, setLoadingKey] = useState(true);
  const [showKey, setShowKey] = useState(false);
  const [dataKey, setDataKey] = useState([]);

  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [showQuestions, setShowQuestions] = useState(false);
  const [dataQuestions, setDataQuestions] = useState([]);

  const queryURL = process.env.REACT_APP_QueryService;
  const keywordURL = process.env.REACT_APP_KeywordService;

  useEffect(() => {
    const fetchData = async () => {
      setLoadingKey(true);
      let res = await axios.get(keywordURL + "/keyword/byquestions");
      setDataKey(res.data);
      setLoadingKey(false);

      setLoadingQuestions(true);
      res = await axios.get(queryURL + "/query/question/bydate");
      setDataQuestions(res.data);
      setLoadingQuestions(false);
    };

    fetchData();
  }, [keywordURL, queryURL]);

  let renderedDataKey;

  if (loadingKey) {
    renderedDataKey = (
      <span className="centered-font">Your Data is still Loading</span>
    );
  } else {
    renderedDataKey = dataKey.map((value) => (
      <div key={value.word} className="post-list" style={{ cursor: "default" }}>
        <span className="question-select" style={{ fontWeight: "500" }}>
          {value.word + ": "}
        </span>
        <span className="question-select" style={{ fontWeight: "300" }}>
          {value.questions}
        </span>
      </div>
    ));
  }

  let renderedDataQuestions;

  if (loadingQuestions) {
    renderedDataQuestions = (
      <span className="centered-font" style={{ marginLeft: "50%" }}>
        Your Data is still Loading
      </span>
    );
  } else {
    renderedDataQuestions = dataQuestions.map((question) => (
      <div
        key={question.date}
        className="post-list"
        style={{ cursor: "default" }}
      >
        <span className="question-select" style={{ fontWeight: "500" }}>
          {question.date + ": "}
        </span>
        <span className="question-select" style={{ fontWeight: "300" }}>
          {question.questions}
        </span>
      </div>
    ));
  }

  return (
    <div className="home-wrapper">
      <h1 className="title">
        <span className="normal-font">Welcome to </span>
        <span className="colored-font">askmeanything</span>
        <span className="normal-font">!</span>
      </h1>

      <button
        className="show-btn-2"
        onClick={() => {
          setShowKey(!showKey);
        }}
        style={{ marginTop: "200px" }}
      >
        Questions Per Keyword:{" "}
      </button>
      {showKey && renderedDataKey}

      <button
        className="show-btn-2"
        onClick={() => {
          setShowQuestions(!showQuestions);
        }}
        style={{ marginTop: "10px" }}
      >
        Questions Per Date:{" "}
      </button>
      {showQuestions && renderedDataQuestions}
    </div>
  );
};

export default Home;
