import React from "react";

import "../AskQuestion/TagsStyle.css";

const PostTag = ({ tags, setTags }) => {
  const addTags = (e) => {
    if (
      e.key === "Enter" &&
      e.target.value !== "" &&
      tags.indexOf(e.target.value.replace(/\s/g, "") === "") === -1
    ) {
      setTags([...tags, e.target.value]);
      e.target.value = "";
    } else if (
      e.key === " " &&
      e.target.value !== "" &&
      tags.indexOf(e.target.value.replace(/\s/g, "") === "") === -1
    ) {
      e.preventDefault();
      setTags([...tags, e.target.value]);
      e.target.value = "";
    } else if (e.key === " " && e.target.value.replace(/\s/g, "") === "") {
      e.preventDefault();
    }
  };

  const removeTags = (e) => {
    setTags([...tags.filter((tag) => tags.indexOf(tag) !== e)]);
  };

  return (
    <div className="tag-wrapper">
      <span className="normal-font">
        <span className="explanation-title">Input your tags!</span>
        <br />
        <span className="details">
          Add some tags that describe your question
        </span>
      </span>
      <br />
      <div className="create-tags-wrapper">
        <ul className="tags-list">
          {tags.map((tag, index) => (
            <li key={index}>
              <div className="font-center">
                <span className="normal-font">{tag}</span>
              </div>
              <button onClick={() => removeTags(index)}>x</button>
            </li>
          ))}

          <li className="tags-input">
            <input
              className="tags-input-field"
              type="text"
              placeholder="Press enter or space to add tags"
              onKeyDown={(e) => addTags(e)}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PostTag;
