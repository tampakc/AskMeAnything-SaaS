import React, { useState } from "react";

const UserContributions = ({ contributions }) => {
  const [showContribs, setShowContribs] = useState(false);

  let renderedContribs = contributions.map((value) => {
    return (
      <div key={value.date} className="post-list" style={{ cursor: "default" }}>
        <div className="question-select" style={{ fontWeight: "500" }}>
          {value.date}
        </div>
        <div className="list-font">{"Questions: " + value.questions}</div>
        <div className="list-font">{"Answers: " + value.answers}</div>
      </div>
    );
  });

  if (renderedContribs.length === 0) {
    renderedContribs = (
      <span className="centered-font">You have no Contributions</span>
    );
  }

  return (
    <div>
      <button
        className="show-btn"
        onClick={() => {
          setShowContribs(!showContribs);
        }}
        style={{ marginTop: "10px" }}
      >
        Your Contributions:{" "}
      </button>
      {showContribs && renderedContribs}
    </div>
  );
};

export default UserContributions;
