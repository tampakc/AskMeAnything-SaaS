const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const dataurl = process.env.dataurl || "http://localhost:";
const dataport = process.env.dataport || 4500;
const serviceport = process.env.PORT || 4503;
const esburl = process.env.esburl || "http://localhost:";
const esbport = process.env.esbport || 4505;

const esb = esburl; // + esbport;
const datalayer = dataurl; // + dataport;

const app = express();
app.use(cors());
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

app.get("/statistics/question/bydate", (req, response) => {
  axios
    .get(datalayer + "/statistics/question/bydate", { validateStatus: false })
    .then((res) => {
      const status = res.status;
      const body = res.data;

      response.status(status).send(body);
    });
});

app.get("/statistics/keyword", (req, response) => {
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

//request to get user contributions per date
app.get("/statistics/user", (req, response) => {
  console.log(req);
  const authHeader =
    req.headers["x-observatory-auth"] ||
    req.headers["Authorization"] ||
    req.headers["authorization"];
  console.log("Contributions token:" + authHeader);

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
        .get(datalayer + "/statistics/user/" + user_id, {
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
  console.log("Statistics service listening on port " + serviceport + "...");
  console.log(esb);
  axios
    .post(esb + "/register", {
      type: "RegisterService",
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
});
