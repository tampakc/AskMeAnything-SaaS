import React from "react";

import "../Question/Question.css";

const DisplayQuestion = ({ data }) => {
  let renderedTags = Object.values(data.tags).map((tag) => {
    return (
      <div
        className="tag-display"
        key={tag.keyword_id}
        onClick={() => {
          window.location.href = "/keyword/" + tag.word;
        }}
      >
        <span className="normal-font">{tag.word + " "}</span>
      </div>
    );
  });

  if (renderedTags.length === 0) {
    renderedTags = <span className="normal-font">No Tags</span>;
  }

  return (
    <div>
      <h1 className="question-font">{data.title}</h1>
      <div className="display-question-wrapper">
        <h4 className="username-wrapper">
          <span className="normal-font" style={{ fontWeight: "400" }}>
            Posted by:
          </span>
          <span className="colored-font">{" " + data.username}</span>
        </h4>
        {renderedTags}
        <h3 className="question-body-wrapper">
          <span className="normal-font">{data.body}</span>
        </h3>
      </div>
      <hr className="hr-divider" />
    </div>
  );
};

export default DisplayQuestion;
