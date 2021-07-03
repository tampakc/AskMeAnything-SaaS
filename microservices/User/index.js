const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const fs = require("fs");
const Joi = require("joi");
require("dotenv").config();
const { createKey } = require("../Auth/Authenticate");
const { default: axios } = require("axios");

const dbport = process.env.dbport || 3306;
const eventport = process.env.eventport || 4005;
const serviceport = process.env.serviceport || 4000;

const eventservice = "http://localhost:" + eventport + "/events";

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),

  first_name: Joi.string().default("NULL"),

  last_name: Joi.string().default("NULL"),
});

const schema2 = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),

  first_name: Joi.string().default("NULL"),

  last_name: Joi.string().default("NULL"),

  repeat_password: Joi.ref("password"),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),

  sex: Joi.number().greater(-1).less(3).default("NULL"),

  phone: Joi.string().pattern(new RegExp("^[0-9-]{10,15}$")).default("NULL"),
}).with("password", "repeat_password");

const app = express();
app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
  host: "localhost",
  user: "userbackend",
  password: "userdata123",
  database: "askme_user",
  port: dbport,
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  con.query(
    "SELECT user_id, password FROM user WHERE username = '" + username + "'",
    function (err, result, fields) {
      if (err) throw err;
      if (result.length == 0) {
        res.status(400).send("User " + username + " does not exist.");
      } else if (result[0].password == password) {
        const body = {
          name: username,
          id: result[0].user_id,
        };
        const token = createKey(body);
        //console.log(token);
        res.status(200).send({ token, username });
      } else {
        res.status(401).send("Password Invalid");
      }
    }
  );
});

app.post("/signup", (req, res) => {
  const form = req.body;
  //console.log(form);

  const result = schema.validate(form);
  //console.log(result);
  if (result.error) {
    res.status(400).send(result.error);
  } else {
    const details = result.value;
    con.query(
      "SELECT COUNT(*) AS count FROM user WHERE username = ? OR email = ?",
      [details.username, details.email],
      (err, result, fields) => {
        if (err) throw err;
        //console.log(result[0]);
        if (result[0].count == 0) {
          con.query(
            "INSERT INTO user(username, password, first_name, last_name, email, sex, phone) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
              details.username,
              details.password,
              details.first_name,
              details.last_name,
              details.email,
              details.sex,
              details.phone,
            ],
            (err, result, fields) => {
              if (err) throw err;
              //console.log(result.insertId);
              res.status(200).send("User has been created.");
              axios.post(eventservice, {
                type: "UserCreated",
                data: { user_id: result.insertId, username: details.username },
              });
            }
          );
        } else {
          res.status(400).send("Email or username not available.");
        }
      }
    );
  }
});

app.listen(serviceport, () => {
  console.log("User service listening on port " + serviceport + "...");
});
