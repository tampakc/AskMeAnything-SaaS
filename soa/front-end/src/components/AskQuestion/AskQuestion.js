import React, { useState } from "react";
import PostQuestion from "../Functions/PostQuestion.js";
import PostTag from "../Functions/PostTag.js";

import "../AskQuestion/AskQuestion.css";

const AskQuestion = () => {
  const [data, setData] = useState([]);

  return (
    <div>
      <h1 className="form-font">
        <span className="normal-font">Ask a Question</span>
        <span className="colored-font"> !</span>
      </h1>

      <div className="display-wrapper">
        <PostTag tags={data} setTags={setData} />
        <PostQuestion tags={data} setTags={setData} />
      </div>
    </div>
  );
};

export default AskQuestion;
