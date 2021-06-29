import React from "react";
import { NavLink } from "react-router-dom";

const Pagination = ({ questionsPerPage, totalQuestions, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalQuestions / questionsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (pageNumbers.length === 1) {
    return <></>;
  }

  return (
    <nav>
      {pageNumbers.map((number) => {
        return (
          <div className="nav-list-wrapper" key={number}>
            <NavLink
              to={"/questions-list/" + number}
              onClick={() => paginate(number)}
              style={{ float: "left" }}
              activeClassName="selected"
              className="nav-list"
            >
              <div className="circle">{number}</div>
            </NavLink>
          </div>
        );
      })}
    </nav>
  );
};

export default Pagination;
