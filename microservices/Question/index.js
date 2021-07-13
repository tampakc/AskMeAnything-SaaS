const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mysql = require("mysql");
require("dotenv").config();
const { authenticateToken } = require("./Authenticate");

const dbport = process.env.dbport || 3306;
const dbuser = process.env.dbuser || "questionbackend";
const dbpass = process.env.dbpass || "question123";
const dbhost = process.env.dbhost || "localhost";
const dbname = process.env.dbname || "askme_question";
const eventaddr = process.env.eventaddr || "http://localhost:";

const eventport = process.env.eventport || 4005;
const serviceport = process.env.PORT || 4001;

const eventservice = eventaddr + "/events";

const app = express();
app.use(express.json());
app.use(cors());

const sqloptions = {
  host: "eu-cdbr-west-01.cleardb.com",
  user: "b92b56b4e8fe42",
  password: "ea8edd2f",
  database: "heroku_bab82586a1635df",
  //port: dbport,
};

let con = mysql.createPool(sqloptions);
con.on("error", () => {
  con = mysql.createPool(sqloptions);
});

app.options("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  res.status(200).send();
});

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
