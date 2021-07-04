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

app.get("/statistics/question/bydate", (response) => {
  axios
    .get(datalayer + "/statistics/question/bydate", { validateStatus: false })
    .then((res) => {
      const status = res.status;
      const body = res.data;

      response.status(status).send(body);
    });
});

app.get("/statistics/keyword", (response) => {
  axios
    .get(datalayer + "/statistics/keyword/byquestion", {
      validateStatus: false,
    })
    .then((res) => {
      const status = res.status;
      const body = res.data;

      response.status(status).send(body);
    });
});

app.get("/statistics/user", (req, response) => {
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
      axios
        .get(datalayer + "/statistics/user", { validateStatus: false })
        .then((res) => {
          const status = res.status;
          const body = res.data;

          response.status(status).send(body);
        });
    });
});

app.listen(serviceport, () => {
  console.log("Answer service listening on port " + serviceport + "...");
  axios.post(esb + "/register", {
    type: "RegisterService",
  });
});
