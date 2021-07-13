import React, { useState } from "react";

const UserContributions = ({ contributions }) => {
  const [showContribs, setShowContribs] = useState(false);

  let renderedContribs = contributions.map((value) => (
    <li key={value.date}>
      <p className="question-select" style={{ fontWeight: "500" }}>
        {value.date}
      </p>
      <p className="list-font">{"Questions: " + value.questions}</p>
      <p className="list-font">{"Answers: " + value.answers}</p>
    </li>
  ));

  if (renderedContribs.length === 0) {
    renderedContribs = (
      <span className="centered-font">You have no Contributions</span>
    );
  }

  let result = <ul className="post-list-ul">{renderedContribs}</ul>;

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
      {showContribs && result}
    </div>
  );
};

export default UserContributions;
