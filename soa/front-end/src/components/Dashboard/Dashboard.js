import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import axios from "axios";

import UserPosts from "../Functions/UserPosts";
import UserAnswers from "../Functions/UserAnswers";
import UserContributions from "../Functions/UserContributions";

import "./Dashboard.css";

const Dashboard = ({ token, username }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        const options = {
          headers: { authorization: token },
        };
        setLoading(true);
        const res = await axios.get(
          "http://localhost:4504/query/dashboard/user",
          options
        );
        setData(res.data);
        const cont = await axios.get(
          "http://localhost:4503/statistics/user",
          options
        );
        setContributions(cont.data);
        setLoading(false);
      };
      fetchData();
    }
  }, [token]);

  if (token) {
    if (loading) {
      return <h2 className="normal-font">Still Loading...</h2>;
    }

    return (
      <div className="dash-wrapper">
        <h1 className="normal-font-2">
          <span>Your Profile </span>
          <span className="colored-font">!</span>
        </h1>
        <h2 className="welcome-wrapper">
          <span className="normal-font">Welcome </span>
          <span className="colored-font">{username}</span>
          <span className="normal-font"> !</span>
        </h2>

        <UserPosts posts={data.questions} />
        <UserAnswers answers={data.answers} />
        <UserContributions contributions={contributions} />
      </div>
    );
  } else {
    return <Redirect to="/login" />;
  }
};

export default Dashboard;
