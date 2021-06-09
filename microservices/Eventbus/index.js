const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const p1 = "http://localhost:";
const p2 = "/events";

const question = p1 + process.env.questionport + p2;
const keyword = p1 + process.env.keywordport + p2;
const answer = p1 + process.env.answerport + p2;
const user = p1 + process.env.userport + p2;
const query = p1 + process.env.queryport + p2;

const routing = {
  QuestionPosted: [query],
  AnswerPosted: [query],
  KeywordsPosted: [keyword],
  KeywordsUpdated: [query],
};

app.post("/event", (req, res) => {
  //we have confirmed that the token is valid so we can continue

  const type = req.body.type;
  const data = req.body.data;

  for (target of routing[type]) {
    axios.post(target, {
      type,
      data,
    });
  }
  res.status(200);
});

app.listen(4005, () => {
  console.log("Listening on port 4005...");
});
