const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mysql = require("mysql");
require("dotenv").config();
const { authenticateToken } = require("./Authenticate");

const dbport = process.env.dbport || 3306;
const eventport = process.env.eventport || 4005;
const serviceport = process.env.serviceport || 4001;

const eventservice = "http://localhost:" + eventport + "/events";

const app = express();
app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
  host: "localhost",
  user: "questionbackend",
  password: "question123",
  database: "askme_question",
  port: dbport,
});

app.get("/question/:id", async (req, res) => {});

app.post("/question", authenticateToken, (req, res) => {
  //we have confirmed that the token is valid so we can continue

  const question = req.body.question;
  const title = req.body.title;
  const user_id = req.user.id;
  const keywords = req.body.keywords;
  const time = req.body.timestamp;

  con.query(
    "INSERT INTO question(user_id, title, body, timestamp) VALUES (?, ?, ?, ?)",
    [user_id, title, question, time],
    (err, result, fields) => {
      if (err) {
        res.status(500).send("Database error");
        return;
      }
      res.status(200).send(result.insertId.toString());
      axios
        .post(eventservice, {
          type: "QuestionPosted",
          data: {
            question_id: result.insertId,
            title,
            question,
            timestamp: time,
            user_id,
          },
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .post(eventservice, {
          type: "KeywordsPosted",
          data: {
            id: result.insertId,
            keywords,
          },
        })
        .catch((error) => {
          console.log(error);
        });
    }
  );
});

app.listen(serviceport, () => {
  console.log("Question service listening on port " + serviceport + "...");
});
