import React, { useState } from "react";
import axios from "axios";

import "../AskQuestion/QuestionStyle.css";

require("dotenv").config();

const PostQuestion = ({ tags, setTags }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const questionURL = process.env.REACT_APP_QuestionService;

  const questionSubmit = async (e) => {
    e.preventDefault();
    let timestamp = new Date();

    const options = {
      headers: { authorization: localStorage.getItem("LoginToken") },
    };
    await axios.post(
      questionURL + "/question",
      {
        title,
        question: body,
        keywords: tags,
        timestamp,
      },
      options
    );

    setTitle("");
    setBody("");
    setTags([]);
  };

  return (
    <div className="create-question-wrapper">
      <form className="question-form" onSubmit={questionSubmit}>
        <div className="question-data">
          <div className="title-form-group">
            <span className="normal-font">
              <span className="explanation-title">Title</span>
              <br />
              <span className="details">Input a title for your question</span>
            </span>
            <br />
            <input
              className="question-title-input"
              value={title}
              type="text"
              placeholder="e.g. How can I ask a question?"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="body-form-group">
            <span className="normal-font">
              <span className="explanation-title">Body</span>
            </span>
            <br />
            <textarea
              className="question-body-input"
              type="text"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
        </div>
        <button className="question-submit-btn">Submit Question</button>
      </form>
    </div>
  );
};

export default PostQuestion;
