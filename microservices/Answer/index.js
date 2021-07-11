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

const eventservice = eventaddr + eventport + "/events";

const app = express();
app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
  host: dbhost,
  user: dbuser,
  password: dbpass,
  database: dbname,
  port: dbport,
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
