import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import DisplayQuestion from "../Functions/DisplayQuestion.js";
import DisplayAnswers from "../Functions/DisplayAnswers.js";
import AnswerField from "../Functions/AnswerField.js";

export default function Question() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const queryURL = process.env.QueryService;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get(queryURL + `/query/question/${id}`);
      setData(res.data);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <>Still loading...</>;
  }

  return (
    <div>
      <DisplayQuestion data={data} />
      <AnswerField question_id={id} />
      <DisplayAnswers data={data.answers} />
    </div>
  );
}
