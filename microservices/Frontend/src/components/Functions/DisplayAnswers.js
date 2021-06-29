import React from "react";

const DisplayAnswers = ({ data }) => {
  const renderedAnswers = Object.values(data).map((answer, index) => {
    return (
      <div key={index}>
        <h4>
          <span className="normal-font" style={{ fontWeight: "400" }}>
            Posted by:{" "}
          </span>
          <span className="colored-font">{answer.username}</span>
        </h4>
        <h6 className="normal-font">{answer.timestamp}</h6>
        <h5 className="normal-font">{answer.body}</h5>
        <hr className="hr-divider" style={{ height: "3px", width: "100%" }} />
      </div>
    );
  });

  return (
    <div>
      <h2 className="question-font" style={{ marginTop: "20px" }}>
        Answers:
      </h2>
      <div className="display-answers-wrapper">{renderedAnswers}</div>
    </div>
  );
};

export default DisplayAnswers;
