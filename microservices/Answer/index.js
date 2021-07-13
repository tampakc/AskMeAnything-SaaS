const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mysql = require("mysql");
require("dotenv").config();
const { authenticateToken } = require("./Authenticate");

const dbport = process.env.dbport || 3306;
const dbuser = process.env.dbuser || "answerbackend";
const dbpass = process.env.dbpass || "answer123";
const dbhost = process.env.dbhost || "localhost";
const dbname = process.env.dbname || "askme_answer";
const eventaddr = process.env.eventaddr || "http://localhost:";

const eventport = process.env.eventport || 4005;
const serviceport = process.env.PORT || 4002;

const eventservice = eventaddr + "/events";

const app = express();
app.use(express.json());
app.use(cors());

const sqloptions = {
  host: "eu-cdbr-west-01.cleardb.com",
  user: "b37f5fd927d9b5",
  password: "aee083ce",
  database: "heroku_4aa7fd4215f010d",
  //port: dbport,
};

let con = mysql.createPool(sqloptions);
con.on("error", () => {
  con = mysql.createPool(sqloptions);
});

app.options("/answer", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  res.status(200).send();
});

app.post("/answer", authenticateToken, (req, res) => {
  //we have confirmed that the token is valid so we can continue

  const question_id = req.body.question_id;
  const answer = req.body.answer;
  const user_id = req.user.id;
  const time = req.body.timestamp;

  con.query(
    "INSERT INTO answer(user_id, question_id, body, timestamp) VALUES (?, ?, ?, ?)",
    [user_id, question_id, answer, time],
    (err, result, fields) => {
      if (err) {
        console.log(err);
        res.status(500).send("Database error");
        return;
      }
      res.status(200).send(result.insertId.toString());
      axios.post(eventservice, {
        type: "AnswerPosted",
        data: {
          user_id,
          answer_id: result.insertId,
          answer,
          question_id,
          timestamp: time,
        },
      });
    }
  );
});

app.listen(serviceport, () => {
  console.log("Answer service listening on port " + serviceport + "...");
});
