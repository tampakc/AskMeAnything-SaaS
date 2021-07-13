const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const dataurl = process.env.dataurl || "http://localhost:";
const dataport = process.env.dataport || 4500;
const serviceport = process.env.PORT || 4501;
const esburl = process.env.esburl || "http://localhost:";
const esbport = process.env.esbport || 4505;

const esb = esburl; // + esbport;
const datalayer = dataurl; // + dataport;

const app = express();
app.use(cors());
app.options("*", cors());
app.use(express.json());

app.options("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  res.status(200).send();
});

//request for posting answer to a question
app.post("/post/answer", (req, response) => {
  const question_id = req.body.question_id;
  const answer = req.body.answer;
  const timestamp = req.body.timestamp;
  const authHeader =
    req.headers["x-observatory-auth"] ||
    req.headers["Authorization"] ||
    req.headers["authorization"];

  axios
    .post(
      esb + "/event",
      {
        type: "AuthenticationNeeded",
        data: {
          token: authHeader,
        },
      },
      { validateStatus: false }
    )
    .then((res) => {
      if (res.status == 500) {
        response.status(500).send("Could not reach services");
        return;
      }
      if (res.status == 401) {
        response.status(401).send("Bad login/Not logged in");
        return;
      }
      const user_id = res.data.user_id;

      axios
        .post(
          datalayer + "/post/answer",
          {
            question_id,
            answer,
            timestamp,
            user_id,
          },
          { validateStatus: false }
        )
        .then((res) => {
          const status = res.status;
          const body = res.data;

          response.status(status).send(body);
        });
    });
});

//request for posting a question
app.post("/post/question", (req, response) => {
  const question = req.body.question;
  const title = req.body.title;
  const keywords = req.body.keywords;
  const timestamp = req.body.timestamp;
  const authHeader =
    req.headers["x-observatory-auth"] ||
    req.headers["authorization"] ||
    req.headers["Authorization"];

  axios
    .post(
      esb + "/event",
      {
        type: "AuthenticationNeeded",
        data: {
          token: authHeader,
        },
      },
      { validateStatus: false }
    )
    .then((res) => {
      if (res.status == 500) {
        response.status(500).send("Could not reach services");
        return;
      }
      if (res.status == 401) {
        response.status(401).send("Bad login/Not logged in");
        return;
      }
      const user_id = res.data.user_id;

      axios
        .post(
          datalayer + "/post/question",
          {
            question,
            title,
            timestamp,
            user_id,
            keywords,
          },
          { validateStatus: false }
        )
        .then((res) => {
          const status = res.status;
          const body = res.data;

          console.log("Error?: " + status);
          response.status(status).send(body);
        });
    });
});

app.listen(serviceport, () => {
  console.log("Posting service listening on port " + serviceport + "...");
  axios.post(esb + "/register", {
    type: "RegisterService",
  });
});
