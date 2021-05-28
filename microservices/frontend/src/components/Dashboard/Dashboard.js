import React from "react";
import { Redirect } from "react-router";

const Dashboard = ({ token }) => {
  if (!token) {
    return <Redirect to="/login" />;
  } else return <h2>Dashboard</h2>;
};

export default Dashboard;
