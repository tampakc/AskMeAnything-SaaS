const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const serviceport = process.env.PORT || 4505;

let routing = {};

const app = express();
app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
  if (req.body.type == "RegisterService") {
    if (!req.body.provides) {
      res.status(200).send();
      console.log("Service Registered");
      return;
    }

    routing[req.body.provides] = req.body.at;
    console.log(
      "ESB: Service " + req.body.provides + " registered at " + req.body.at
    );
    res.status(200).send();
  }
  else res.status(200).send("Received")
});

app.post("/event", (req, res) => {
  const target = routing[req.body.type];
  if (!target) {
    res
      .status(500)
      .send(
        "ESB: ERROR! No service registered for request of type: " +
          req.body.type
      );
    return;
  }
  axios.post(target, req.body, { validateStatus: false }).then((response) => {
    res.status(response.status).send(response.data);
  });
});

app.listen(serviceport, () => {
  console.log("ESB listening on port " + serviceport + "...");
});
