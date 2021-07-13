import React from "react";

import "../AllQuestions/ListStyle.css";

const ListQuestions = ({ loading, questions }) => {
  if (loading) {
    return <h2 className="normal-font">Loading...</h2>;
  }
  return (
    <div className="list-questions-wrapper" style={{ marginTop: "180px" }}>
      <ul className="questions-list">
        {questions.map((question) => (
          <li
            key={question.question_id}
            onClick={() => {
              window.location.href = "/question/" + question.question_id;
            }}
          >
            <div className="question-select-wrapper">
              <span className="username-font">
                {"Posted by user " + question.username}
              </span>
              <span className="question-select">{question.title}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListQuestions;
