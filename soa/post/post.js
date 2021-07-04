const express = require("express");
const axios = require("axios");
require("dotenv").config();

const dataport = process.env.dataport || 4500;
const serviceport = process.env.serviceport || 4501;
const esbport = process.env.esbport || 4505;

const esb = "http://localhost:" + esbport;
const datalayer = "http://localhost:" + dataport;

const app = express();
app.use(express.json());

//request for posting answer to a question
app.post("/post/answer", (req, response) => {
  const question_id = req.body.question_id;
  const answer = req.body.answer;
  const time = req.body.timestamp;
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
            time,
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
  const time = req.body.timestamp;
  const authHeader =
    req.headers["x-observatory-auth"] || req.headers["authorization"];

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
            time,
            user_id,
            keywords,
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

app.listen(serviceport, () => {
  console.log("Posting service listening on port " + serviceport + "...");
  axios.post(esb + "/register", {
    type: "RegisterService",
  });
});
