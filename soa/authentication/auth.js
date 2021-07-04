const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const dataport = process.env.dataport || 4500;
const serviceport = process.env.serviceport || 4502;
const esbport = process.env.esbport || 4505;

const key = process.env.ACCESS_TOCKEN_SECRET;

const esb = "http://localhost:" + esbport;
const datalayer = "http://localhost:" + dataport;

const app = express();
app.use(express.json());

app.post("/event", (req, res) => {
  if (req.body.type == "AuthenticationNeeded") {
    const token = req.body.data.token;
    jwt.verify(token, key, (err, decoded) => {
      if (err) {
        res.status(401).send("Token is invalid");
      }
      res.status(200).send(decoded);
    });
  } else {
    res.status(404).send();
  }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  axios
    .get(datalayer + "/user/" + username, { validateStatus: false })
    .then((response) => {
      if (response.status == 401) {
        res.status(401).send("Incorrect username or password");
        return;
      } else if (response.status == 200) {
        const head = { username, user_id: response.data.user_id };
        const token = jwt.sign(head, key);
        res.status(200).send(token);
      } else res.status(500).send();
    });
});

app.post("/signup", (req, res) => {
  const details = req.body;

  axios
    .get(datalayer + "/user/" + details.username, { validateStatus: false })
    .then((response) => {
      if (response.data.user_id) {
        res
          .status(400)
          .send("User with username " + detauls.username + " already exists");
        return;
      }
      axios
        .post(
          datalayer + "/user/signup",
          {
            username: details.username,
            password: details.password,
          },
          { validateStatus: false }
        )
        .then((response) => {
          if (response.status == 200) {
            res.status(200).send("User has been created");
            return;
          }
          res.status(500).send();
        });
    });
});

app.listen(serviceport, () => {
  console.log("Auth service listening on port " + serviceport + "...");
  axios.post(esb + "/register", {
    type: "RegisterService",
    provides: "AuthenticationNeeded",
    at: "http://localhost:" + serviceport + "/event",
  });
});
