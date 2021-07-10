import React, { useState } from "react";
import axios from "axios";

import "../Question/Question.css";

const AnswerField = ({ question_id }) => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    const timestamp = new Date();

    const options = {
      headers: { authorization: localStorage.getItem("LoginToken") },
    };

    await axios.post(
      "http://localhost:4501/post/answer",
      {
        question_id,
        answer,
        timestamp,
      },
      options
    );
  };

  return (
    <div>
      <h2 className="question-font" style={{ marginTop: "20px" }}>
        Your Answer:
      </h2>
      <form onSubmit={handleSubmit} className="answer-field-wrapper">
        <textarea
          type="text"
          className="answer-body-input"
          onChange={(e) => setAnswer(e.target.value)}
        />
        <input type="submit" className="answer-submit-btn" />
      </form>
    </div>
  );
};

export default AnswerField;