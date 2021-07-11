const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const dataurl = process.env.dataurl || "http://localhost:";
const dataport = process.env.dataport || 4500;
const serviceport = process.env.PORT || 4504;
const esburl = process.env.esburl || "http://localhost:";
const esbport = process.env.esbport || 4505;

const esb = esburl + esbport;
const datalayer = dataurl + dataport;

const app = express();
app.use(cors());
app.use(express.json());

//request to get all questions
app.get("/query/question/all/titles", (req, response) => {
  axios
    .get(datalayer + "/query/question/all/titles", {
      validateStatus: false,
    })
    .then((res) => {
      const status = res.status;
      const body = res.data;

      response.status(status).send(body);
    });
});

//request to get specified question + all of its answers
app.get("/query/question/:question_id", (req, response) => {
  const question_id = req.params.question_id;

  axios
    .get(datalayer + "/query/question/" + question_id, {
      validateStatus: false,
    })
    .then((res) => {
      const status = res.status;
      const body = res.data;

      response.status(status).send(body);
    });
});

//request to get all questions containing specified keyword
app.get("/query/keyword/:keyword", (req, response) => {
  const keyword = req.params.keyword;

  axios
    .get(datalayer + "/query/keyword/" + keyword, {
      validateStatus: false,
    })
    .then((res) => {
      const status = res.status;
      const body = res.data;

      response.status(status).send(body);
    });
});

//request to get all of the logged in user's questions + answers
app.get("/query/dashboard/user", (req, response) => {
  const authHeader =
    req.headers["x-observatory-auth"] ||
    req.headers["Authorization"] ||
    req.headers["authorization"];
  console.log("Dashboard token:" + authHeader);

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
        .get(datalayer + "/query/dashboard/user/" + user_id, {
          validateStatus: false,
        })
        .then((res) => {
          const status = res.status;
          const body = res.data;

          response.status(status).send(body);
        });
    });
});

app.listen(serviceport, () => {
  console.log("Query service listening on port " + serviceport + "...");
  axios.post(esb + "/register", {
    type: "RegisterService",
  });
});
