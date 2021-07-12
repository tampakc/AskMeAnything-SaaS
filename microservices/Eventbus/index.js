const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const serviceport = process.env.PORT || 4005;

const p2 = "/events";

const questionurl = process.env.questionurl || "http://localhost:";
const question = questionurl + p2; //(process.env.questionport || 4001) + p2;
const keywordurl = process.env.keywordurl || "http://localhost:";
const keyword = keywordurl + p2; //(process.env.keywordport || 4003) + p2;
const answerurl = process.env.keywordurl || "http://localhost:";
const answer = answerurl + p2; //(process.env.answerport || 4002) + p2;
const userurl = process.env.userurl || "http://localhost:";
const user = userurl + p2; //(process.env.userport || 4000) + p2;
const queryurl = process.env.queryurl || "http://localhost:";
const query = queryurl + p2; //(process.env.queryport || 4004) + p2;

const routing = {
  QuestionPosted: [query],
  AnswerPosted: [query],
  KeywordsPosted: [keyword],
  KeywordsUpdated: [query],
  UserCreated: [query],
};

app.post("/events", (req, res) => {
  //we have confirmed that the token is valid so we can continue

  const type = req.body.type;
  const data = req.body.data;
  console.log(routing[type]);
  //console.log("received event of type " + type);

  for (target of routing[type]) {
    //console.log("Sending it to " + target);
    axios
      .post(target, {
        type,
        data,
      })
      .then((response) => {
        res.status(200).send(response.data);
      });
  }
  res.status(200);
});

app.listen(serviceport, () => {
  console.log("Event bus listening on port " + serviceport + "...");
});
