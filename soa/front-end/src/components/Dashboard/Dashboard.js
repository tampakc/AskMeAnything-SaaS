import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router";
import axios from "axios";

import UserPosts from "../Functions/UserPosts";
import UserAnswers from "../Functions/UserAnswers";
import UserContributions from "../Functions/UserContributions";

import "./Dashboard.css";

require("dotenv").config();

const Dashboard = ({ token, username }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [contributions, setContributions] = useState([]);

  const queryURL = useRef(process.env.REACT_APP_QueryService);
  const statisticsURL = useRef(process.env.REACT_APP_StatisticsService);

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        const options = {
          headers: { authorization: token },
        };
        setLoading(true);
        const res = await axios.get(
          queryURL.current + "/query/dashboard/user",
          options
        );
        setData(res.data);
        const cont = await axios.get(
          statisticsURL.current + "/statistics/user",
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
